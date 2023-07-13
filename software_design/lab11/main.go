package main

import (
	"flag"
	"lab11/exchange_emulator"
)

var PORT = flag.Int("p", 5000, "port for the app to use")

func main() {
	exchangeEmulator := exchange_emulator.NewExchangeEmulator(*PORT)
	exchangeEmulator.Start()
}
