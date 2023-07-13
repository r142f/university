package model

import "fmt"

type Product struct {
	Name     string  `bson:"name"`
	USDPrice float64 `bson:"price"`
}

func (product *Product) String() string {
	return fmt.Sprintf("%v: %v", product.Name, product.USDPrice)
}

func (product *Product) price(currency Currency) float64 {
	switch currency {
	case EUR:
		return product.USDPrice * 0.9
	case RUB:
		return product.USDPrice * 420
	default:
		return product.USDPrice
	}
}

func (product *Product) Print(currency Currency) string {
	return fmt.Sprintf("%v: %v", product.Name, product.price(currency))
}
