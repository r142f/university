package main

import (
	"flag"
	"lab12/server"
)

var PORT = flag.Int("p", 8082, "port for the app to use")

func main() {
	s := server.NewServer(*PORT)
	s.Start()
}
