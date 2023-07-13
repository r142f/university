package main

import (
	"fmt"
	"lab9/app"
	"lab9/server"
)

func main() {
	go server.Start()
	for _, sa := range app.Query("query query") {
		fmt.Println(*sa)
	}
}
