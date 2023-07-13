package main

import (
	"fmt"
	"log"
	"strconv"
	"time"

	"lab7/counter"
)

func main() {
	var counterType, aStr, bStr string
	for {
		fmt.Print("\nChoose counter type (slow / fast, \\q to exit): ")
		_, err := fmt.Scan(&counterType)
		if err != nil {
			log.Fatalln(err)
		}
		if counterType == "\\q" {
			break
		}

		var c *counter.Counter
		if counterType == "slow" {
			c = counter.SlowCounter
		} else if counterType == "fast" {
			c = counter.FastCounter
		} else {
			log.Fatalln("Uknown counter type!")
		}

		fmt.Print("\nEnter space-separated arguments (\\q to exit): ")
		_, err = fmt.Scan(&aStr)
		if err != nil {
			log.Fatalln(err)
		}
		if aStr == "\\q" {
			continue
		}
		_, err = fmt.Scan(&bStr)
		if err != nil {
			log.Fatalln(err)
		}

		a, err := strconv.ParseFloat(aStr, 64)
		if err != nil {
			log.Fatalln(err)
		}
		b, err := strconv.ParseFloat(bStr, 64)
		if err != nil {
			log.Fatalln(err)
		}

		proxy := counter.GetProxy(c)
		result := proxy.Method(c.Add).(func(int, int) int)(int(a), int(b))
		fmt.Printf("\nResult: %v, time taken: %v\n", result, counter.AddExecutionTime)
		for counter.TimesAddCalled < 10 {
			proxy.Method(c.Add).(func(int, int) int)(int(a), int(b))
		}
		fmt.Printf(
			"Average time taken: %v, times called: %v\n",
			counter.AddExecutionTime/time.Duration(counter.TimesAddCalled),
			counter.TimesAddCalled)
	}
}
