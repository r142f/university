package model

import (
	"fmt"
)

type User struct {
	Id       int      `bson:"_id"`
	Currency Currency `bson:"currency"`
}

func (user *User) String() string {
	return fmt.Sprintf("%v: %v", user.Id, user.Currency)
}
