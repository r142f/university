package exchange_emulator

import (
	"fmt"
	"net/http"
	"net/url"
	"strconv"
	"strings"
)

type ExchangeEmulator struct {
	exchange *Exchange
	port     int
}

func NewExchangeEmulator(port int) *ExchangeEmulator {
	return &ExchangeEmulator{exchange: newExchange(), port: port}
}

func (exchangeEmulator *ExchangeEmulator) addStockHandler(w http.ResponseWriter, req *http.Request) {
	company := req.URL.Query().Get("company")
	priceStr := req.URL.Query().Get("price")
	quantityStr := req.URL.Query().Get("quantity")

	if company == "" || priceStr == "" || quantityStr == "" {
		http.Error(w, "addStockHandler: wrong parameters", 500)
		return
	}

	price, err := strconv.Atoi(priceStr)
	if err != nil || price <= 0 {
		http.Error(w, "addStockHandler: wrong parameters", 500)
		return
	}

	quantity, err := strconv.Atoi(quantityStr)
	if err != nil || quantity <= 0 {
		http.Error(w, "addStockHandler: wrong parameters", 500)
		return
	}

	err = exchangeEmulator.exchange.addStock(company, price, quantity)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (exchangeEmulator *ExchangeEmulator) getStocksInfoHandler(w http.ResponseWriter, req *http.Request) {
	companies := req.URL.Query().Get("companies")

	if companies == "" {
		http.Error(w, "getStocksInfoHandler: wrong parameters", 500)
		return
	}

	stocksInfo, err := exchangeEmulator.exchange.getStocksInfo(strings.Split(companies, ","))
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	stocksInfoEncoded := make(url.Values)
	for k, v := range stocksInfo {
		stocksInfoEncoded.Set(k, fmt.Sprintf("%v,%v", v[0], v[1]))
	}

	w.Write([]byte(stocksInfoEncoded.Encode()))
}

func (exchangeEmulator *ExchangeEmulator) buyStockHandler(w http.ResponseWriter, req *http.Request) {
	company := req.URL.Query().Get("company")
	quantityStr := req.URL.Query().Get("quantity")
	balanceStr := req.URL.Query().Get("balance")

	if company == "" || balanceStr == "" || quantityStr == "" {
		http.Error(w, "buyStockHandler: wrong parameters", 500)
		return
	}

	balance, err := strconv.Atoi(balanceStr)
	if err != nil || balance <= 0 {
		http.Error(w, "buyStockHandler: wrong parameters", 500)
		return
	}

	quantity, err := strconv.Atoi(quantityStr)
	if err != nil || quantity <= 0 {
		http.Error(w, "buyStockHandler: wrong parameters", 500)
		return
	}

	exchangeEmulator.exchange.stocksMU.Lock()
	defer exchangeEmulator.exchange.stocksMU.Unlock()

	price, err := exchangeEmulator.exchange.buyStock(company, quantity, balance)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	exchangeEmulator.exchange.increaseStockPrice(company)

	w.Write([]byte(fmt.Sprint(price)))
}

func (exchangeEmulator *ExchangeEmulator) sellStockHandler(w http.ResponseWriter, req *http.Request) {
	company := req.URL.Query().Get("company")
	quantityStr := req.URL.Query().Get("quantity")

	if company == "" || quantityStr == "" {
		http.Error(w, "sellStockHandler: wrong parameters", 500)
		return
	}

	quantity, err := strconv.Atoi(quantityStr)
	if err != nil || quantity <= 0 {
		http.Error(w, "sellStockHandler: wrong parameters", 500)
		return
	}

	exchangeEmulator.exchange.stocksMU.Lock()
	defer exchangeEmulator.exchange.stocksMU.Unlock()

	price, err := exchangeEmulator.exchange.sellStock(company, int(quantity))
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	exchangeEmulator.exchange.decreaseStockPrice(company)

	w.Write([]byte(fmt.Sprint(price)))
}

func (exchangeEmulator *ExchangeEmulator) Start() {
	http.HandleFunc("/addStock", exchangeEmulator.addStockHandler)
	http.HandleFunc("/getStocksInfo", exchangeEmulator.getStocksInfoHandler)
	http.HandleFunc("/buyStock", exchangeEmulator.buyStockHandler)
	http.HandleFunc("/sellStock", exchangeEmulator.sellStockHandler)

	http.ListenAndServe(fmt.Sprintf(":%v", exchangeEmulator.port), nil)
}
