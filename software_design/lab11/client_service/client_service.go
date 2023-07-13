package client_service

import (
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"sync"

	"github.com/google/uuid"
)

type Client struct {
	clientId uuid.UUID
	balance  int
	stocks   map[string]int
	clientMU sync.RWMutex
}

type ClientService struct {
	ExchangeAddress string
	clients         map[uuid.UUID]*Client
}

func AddStock(address string, company string, price int, quantity int) error {
	resp, err := http.Get(
		fmt.Sprintf(
			"%v/addStock?company=%v&price=%v&quantity=%v",
			address,
			company,
			price,
			quantity,
		),
	)

	if err != nil {
		return err
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	if resp.StatusCode != http.StatusOK {
		return errors.New(string(body))
	}

	return nil
}

func (clientService *ClientService) NewClient() uuid.UUID {
	clientId := uuid.New()

	if clientService.clients == nil {
		clientService.clients = make(map[uuid.UUID]*Client)
	}

	clientService.clients[clientId] =
		&Client{
			clientId: clientId,
			stocks:   make(map[string]int),
		}

	return clientId
}

func (clientService *ClientService) Deposit(clientId uuid.UUID, money int) error {
	client, ok := clientService.clients[clientId]

	if !ok {
		return errors.New("Deposit: client doesn't exist")
	}

	client.clientMU.Lock()
	defer client.clientMU.Unlock()

	client.balance += money

	return nil
}

func (clientService *ClientService) Withdraw(clientId uuid.UUID, money int) error {
	client, ok := clientService.clients[clientId]

	if !ok {
		return errors.New("Withdraw: client doesn't exist")
	}

	client.clientMU.Lock()
	defer client.clientMU.Unlock()

	if client.balance < money {
		return errors.New("Withdraw: insufficient balance")
	}

	client.balance -= money

	return nil
}

func (clientService *ClientService) BuyStock(clientId uuid.UUID, company string, quantity int) error {
	client, ok := clientService.clients[clientId]

	if !ok {
		return errors.New("BuyStock: client doesn't exist")
	}

	client.clientMU.Lock()
	defer client.clientMU.Unlock()

	resp, err := http.Get(
		fmt.Sprintf(
			"%v/buyStock?company=%v&quantity=%v&balance=%v",
			clientService.ExchangeAddress,
			company,
			quantity,
			client.balance,
		),
	)
	if err != nil {
		return err
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	if resp.StatusCode != http.StatusOK {
		return errors.New(string(body))
	}

	price, err := strconv.Atoi(string(body))
	if err != nil {
		return err
	}

	client.balance -= price * quantity
	client.stocks[company] += quantity

	return nil
}

func (clientService *ClientService) SellStock(clientId uuid.UUID, company string, quantity int) error {
	client, ok := clientService.clients[clientId]

	if !ok {
		return errors.New("SellStock: client doesn't exist")
	}

	client.clientMU.Lock()
	defer client.clientMU.Unlock()

	if client.stocks[company] < quantity {
		return errors.New("SellStock: not enough stocks")
	}

	resp, err := http.Get(
		fmt.Sprintf(
			"%v/sellStock?company=%v&quantity=%v",
			clientService.ExchangeAddress,
			company,
			quantity,
		),
	)
	if err != nil {
		return err
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	if resp.StatusCode != http.StatusOK {
		return errors.New(string(body))
	}

	price, err := strconv.Atoi(string(body))
	if err != nil {
		return err
	}

	client.balance += price * quantity
	client.stocks[company] -= quantity

	return nil
}

func (clientService *ClientService) GetClientStocksInfo(clientId uuid.UUID) (map[string][2]int, error) {
	client, ok := clientService.clients[clientId]

	if !ok {
		return nil, errors.New("GetClientStocksInfo: client doesn't exist")
	}

	client.clientMU.RLock()
	defer client.clientMU.RUnlock()

	companies := make([]string, 0)
	for company := range client.stocks {
		companies = append(companies, company)
	}

	resp, err := http.Get(
		fmt.Sprintf(
			"%v/getStocksInfo?companies=%v",
			clientService.ExchangeAddress,
			strings.Join(companies, ","),
		),
	)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != http.StatusOK {
		return nil, errors.New(string(body))
	}

	stocksInfo, err := url.ParseQuery(string(body))
	if err != nil {
		return nil, err
	}

	clientStocksInfo := make(map[string][2]int)
	for company, info := range stocksInfo {
		price, err := strconv.Atoi(strings.Split(info[0], ",")[0])
		if err != nil {
			return nil, err
		}

		clientStocksInfo[company] = [2]int{price, client.stocks[company]}
	}

	return clientStocksInfo, nil
}

func (clientService *ClientService) GetClientTotalFunds(clientId uuid.UUID) (int, error) {
	client, ok := clientService.clients[clientId]

	if !ok {
		return 0, errors.New("GetClientTotalFunds: client doesn't exist")
	}

	client.clientMU.RLock()
	defer client.clientMU.RUnlock()

	companies := make([]string, 0)
	for company := range client.stocks {
		companies = append(companies, company)
	}

	resp, err := http.Get(
		fmt.Sprintf(
			"%v/getStocksInfo?companies=%v",
			clientService.ExchangeAddress,
			strings.Join(companies, ","),
		),
	)
	if err != nil {
		return 0, err
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return 0, err
	}

	if resp.StatusCode != http.StatusOK {
		return 0, errors.New(string(body))
	}

	stocksInfo, err := url.ParseQuery(string(body))
	if err != nil {
		return 0, err
	}

	clientTotalFunds := client.balance
	for company, info := range stocksInfo {
		price, err := strconv.Atoi(strings.Split(info[0], ",")[0])
		if err != nil {
			return 0, err
		}

		clientTotalFunds += client.stocks[company] * price
	}

	return clientTotalFunds, nil
}
