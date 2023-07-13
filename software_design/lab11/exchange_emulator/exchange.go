package exchange_emulator

import (
	"errors"
	"math/rand"
	"sync"
)

type Exchange struct {
	stocks   map[string][2]int
	stocksMU sync.RWMutex
}

func newExchange() *Exchange {
	return &Exchange{stocks: make(map[string][2]int)}
}

func (exchange *Exchange) addStock(company string, price int, quantity int) error {
	exchange.stocksMU.Lock()
	defer exchange.stocksMU.Unlock()

	if _, ok := exchange.stocks[company]; ok {
		return errors.New("addStock: stock has been already added")
	}

	exchange.stocks[company] = [2]int{price, quantity}

	return nil
}

func (exchange *Exchange) getStocksInfo(companies []string) (map[string][2]int, error) {
	exchange.stocksMU.RLock()
	defer exchange.stocksMU.RUnlock()

	stocksInfo := make(map[string][2]int)
	for _, company := range companies {
		info, ok := exchange.stocks[company]
		if !ok {
			return nil, errors.New("getStocksInfo: stock doesn't exist")
		}

		stocksInfo[company] = info
	}

	return stocksInfo, nil
}

func (exchange *Exchange) increaseStockPrice(company string) {
	info := exchange.stocks[company]
	exchange.stocks[company] = [2]int{info[0] + rand.Intn(info[0]), info[1]}
}

func (exchange *Exchange) decreaseStockPrice(company string) {
	info := exchange.stocks[company]
	exchange.stocks[company] = [2]int{info[0] - rand.Intn(info[0]), info[1]}
}

func (exchange *Exchange) buyStock(company string, quantity int, balance int) (int, error) {
	info, ok := exchange.stocks[company]
	price := info[0]
	if !ok {
		return price, errors.New("buyStock: stock doesn't exist")
	} else if info[1] < quantity {
		return price, errors.New("buyStock: not enough stocks")
	}

	totalPrice := quantity * price
	if totalPrice > balance {
		return price, errors.New("buyStock: not enough funds")
	}

	exchange.stocks[company] = [2]int{info[0], info[1] - quantity}

	return price, nil
}

func (exchange *Exchange) sellStock(company string, quantity int) (int, error) {
	info, ok := exchange.stocks[company]
	price := info[0]
	if !ok {
		return price, errors.New("sellStock: stock doesn't exist")
	}

	exchange.stocks[company] = [2]int{info[0], info[1] + quantity}

	return price, nil
}
