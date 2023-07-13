package model

import "strings"

type Currency int64

const (
	USD Currency = iota
	EUR
	RUB
)

func (currency Currency) String() string {
	switch currency {
	case USD:
		return "USD"
	case EUR:
		return "EUR"
	case RUB:
		return "RUB"
	default:
		return "???"
	}
}

func FromString(currency string) Currency {
	switch strings.ToUpper(currency) {
	case "USD":
		return USD
	case "EUR":
		return EUR
	case "RUB":
		return RUB
	}

	return -1
}
