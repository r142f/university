package server

import (
	"context"
	"fmt"
	"github.com/reactivex/rxgo/v2"
	"lab12/database"
	"lab12/error_texts"
	"lab12/model"
	"net/http"
	"strconv"
)

type Server struct {
	port     int
	database *database.Database
}

func NewServer(port int) *Server {
	return &Server{port: port, database: database.NewDatabase()}
}

func (server *Server) AddUser(w http.ResponseWriter, req *http.Request) {
	idStr := req.URL.Query().Get("id")
	currencyStr := req.URL.Query().Get("currency")

	if idStr == "" || currencyStr == "" {
		http.Error(w, error_texts.ADD_USER_WRONG_PARAMS, 500)
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, error_texts.ADD_USER_WRONG_PARAMS, 500)
		return
	}

	currency := model.FromString(currencyStr)

	<-server.database.AddUser(
		&model.User{Id: id, Currency: currency},
	).ForEach(func(v interface{}) {
		w.Write([]byte(fmt.Sprintf("Created user <id: %v>, <currency: %v", id, currency)))
	}, func(err error) {
		http.Error(w, error_texts.ADD_USER_ERROR, 500)
	}, func() {})
}

func (server *Server) Users(w http.ResponseWriter, req *http.Request) {
	item := <-server.database.Users().Reduce(func(_ context.Context, acc interface{}, elem interface{}) (interface{}, error) {
		if acc == nil {
			if elem == nil {
				return error_texts.NO_USERS, nil
			}

			return elem.(*model.User).String(), nil
		}

		return fmt.Sprintf("%v\n%v", acc, elem), nil
	}).Observe()

	w.Write([]byte(item.V.(string)))
}

func (server *Server) AddProduct(w http.ResponseWriter, req *http.Request) {
	name := req.URL.Query().Get("name")
	priceStr := req.URL.Query().Get("price")

	if name == "" || priceStr == "" {
		http.Error(w, error_texts.ADD_PRODUCT_WRONG_PARAMS, 500)
		return
	}

	price, err := strconv.ParseFloat(priceStr, 64)
	if err != nil {
		http.Error(w, error_texts.ADD_PRODUCT_WRONG_PARAMS, 500)
		return
	}

	<-server.database.AddProduct(
		&model.Product{Name: name, USDPrice: price},
	).ForEach(func(v interface{}) {
		w.Write([]byte(fmt.Sprintf("Added product <name: %v>, <USD price: %v>", name, price)))
	}, func(err error) {
		http.Error(w, error_texts.ADD_PRODUCT_ERROR, 500)
	}, func() {})
}

func (server *Server) Products(w http.ResponseWriter, req *http.Request) {
	idStr := req.URL.Query().Get("id")

	if idStr == "" {
		http.Error(w, error_texts.PRODUCTS_WRONG_PARAMS, 500)
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, error_texts.PRODUCTS_WRONG_PARAMS, 500)
		return
	}

	item := <-server.database.User(id).Map(func(_ context.Context, i interface{}) (interface{}, error) {
		return i.(*model.User).Currency, nil
	}).FlatMap(func(i rxgo.Item) rxgo.Observable {
		return server.database.Products().Map(func(_ context.Context, product interface{}) (interface{}, error) {
			if i.Error() {
				return i.E.Error(), i.E
			}
			if product == nil {
				return error_texts.NO_PRODUCTS, nil
			}

			return fmt.Sprintln(product.(*model.Product).Print(i.V.(model.Currency))), nil
		})
	}).Reduce(func(_ context.Context, acc interface{}, elem interface{}) (interface{}, error) {
		if acc == nil {
			return elem.(string), nil
		}

		return fmt.Sprintf("%v\n%v", acc, elem), nil
	}).Observe()

	if item.Error() {
		http.Error(w, item.E.Error(), 500)
	} else {
		w.Write([]byte(item.V.(string)))
	}
}

func (server *Server) Start() {
	http.HandleFunc("/addUser", server.AddUser)
	http.HandleFunc("/users", server.Users)
	http.HandleFunc("/addProduct", server.AddProduct)
	http.HandleFunc("/products", server.Products)

	http.ListenAndServe(fmt.Sprintf(":%v", server.port), nil)
}
