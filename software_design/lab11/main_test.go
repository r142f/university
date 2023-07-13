package main_test

import (
	// "fmt"
	"context"
	"fmt"
	"testing"

	"lab11/client_service"

	"github.com/docker/go-connections/nat"
	"github.com/testcontainers/testcontainers-go"
)

var PORT = 5000

func setupExchangeEmulator() string {
	ctx := context.Background()

	req := testcontainers.ContainerRequest{
		FromDockerfile: testcontainers.FromDockerfile{
			Context:    ".",
			Dockerfile: "Dockerfile",
		},
	}

	container, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
		ContainerRequest: req,
		Started:          true,
	})
	if err != nil {
		panic(err)
	}

	natPort, err := nat.NewPort("tcp", fmt.Sprint(PORT))
	if err != nil {
		panic(err)
	}
	port, err := container.MappedPort(ctx, natPort)
	if err != nil {
		panic(err)
	}
	ip, err := container.Host(ctx)
	if err != nil {
		panic(err)
	}

	return fmt.Sprintf("http://%s:%s", ip, port.Port())
}

func TestOneClient(t *testing.T) {
	exchangeAddress := setupExchangeEmulator()

	if err := client_service.AddStock(exchangeAddress, "company-1", 20, 10); err != nil {
		t.Error(err)
	}

	if err := client_service.AddStock(exchangeAddress, "company-2", 10, 5); err != nil {
		t.Error(err)
	}

	clientService := &client_service.ClientService{ExchangeAddress: exchangeAddress}
	clientId := clientService.NewClient()

	if err := clientService.BuyStock(clientId, "company-1", 10); err == nil {
		t.Error("expected not enough funds error")
	}

	if err := clientService.Deposit(clientId, 1000); err != nil {
		t.Error(err)
	}

	if err := clientService.BuyStock(clientId, "company-1", 10); err != nil {
		t.Error(err)
	}

	if clientStocksInfo, err := clientService.GetClientStocksInfo(clientId); clientStocksInfo["company-1"][0] < 10 {
		t.Errorf("expected %v price %v >= %v", "company-1", clientStocksInfo["company-1"][0], 10)
	} else if err != nil {
		t.Error(err)
	}

	if err := clientService.BuyStock(clientId, "company-1", 10); err == nil {
		t.Error("expected not enough stocks error")
	}

	if err := clientService.BuyStock(clientId, "company-2", 4); err != nil {
		t.Error(err)
	}

	if err := clientService.BuyStock(clientId, "company-2", 1); err != nil {
		t.Error(err)
	}

	computedTotalFunds, err := clientService.GetClientTotalFunds(clientId)
	if err != nil {
		t.Error(err)
	}

	if err := clientService.SellStock(clientId, "company-1", 10); err != nil {
		t.Error(err)
	}
	if err := clientService.SellStock(clientId, "company-2", 5); err != nil {
		t.Error()
	}

	if newComputedTotalFunds, err := clientService.GetClientTotalFunds(clientId); computedTotalFunds != newComputedTotalFunds {
		t.Errorf("expected %v == %v", computedTotalFunds, newComputedTotalFunds)
	} else if err != nil {
		t.Error(err)
	}
}

func TestTwoClients(t *testing.T) {
	exchangeAddress := setupExchangeEmulator()

	if err := client_service.AddStock(exchangeAddress, "company-1", 20, 10); err != nil {
		t.Error(err)
	}

	clientService := &client_service.ClientService{ExchangeAddress: exchangeAddress}
	clientId_1 := clientService.NewClient()
	clientId_2 := clientService.NewClient()

	if err := clientService.Deposit(clientId_1, 500); err != nil {
		t.Error(err)
	}
	if err := clientService.Deposit(clientId_2, 500); err != nil {
		t.Error(err)
	}

	if err := clientService.BuyStock(clientId_1, "company-1", 5); err != nil {
		t.Error(err)
	}
	if err := clientService.BuyStock(clientId_2, "company-1", 5); err != nil {
		t.Error(err)
	}

	if err := clientService.SellStock(clientId_1, "company-1", 5); err != nil {
		t.Error(err)
	}

	if totalFunds, err := clientService.GetClientTotalFunds(clientId_1); totalFunds < 500 {
		t.Errorf("expected %v >= %v", totalFunds, 500)
	} else if err != nil {
		t.Error(err)
	}

	if err := clientService.SellStock(clientId_2, "company-1", 5); err != nil {
		t.Error(err)
	}

	totalFunds, err := clientService.GetClientTotalFunds(clientId_2)
	if err != nil {
		t.Error(err)
	}
	if err := clientService.Withdraw(clientId_2, totalFunds+1); err == nil {
		t.Error("expected not enough funds error")
	}
	if err := clientService.Withdraw(clientId_2, totalFunds); err != nil {
		t.Error(err)
	}

	if totalFunds, err = clientService.GetClientTotalFunds(clientId_2); totalFunds != 0 {
		t.Errorf("expected %v == %v", totalFunds, 0)
	} else if err != nil {
		t.Error(err)
	}
}
