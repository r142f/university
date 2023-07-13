package main

import (
	"SD.task-2/server"
	"fmt"
	"os"
	"strconv"
)

func main() {
	hashtag := os.Args[1]
	n, err := strconv.Atoi(os.Args[2])
	if err != nil {
		fmt.Printf("atoi(%v): %v\n", n, err)
		os.Exit(1)
	}

	frequency, err := server.GetFrequency(hashtag, n)
	if err != nil {
		fmt.Printf("server.GetFrequency(%v, %v): %v\n", hashtag, n, err)
		os.Exit(1)
	}

	totalCount := 0
	for _, value := range frequency {
		totalCount += value
	}

	fmt.Printf("%v posts with \"%v\" hashtag for the last %v hours.\nFrequency:\n", totalCount, hashtag, n)
	for hour := 0; hour < len(frequency); hour++ {
		fmt.Printf("  - Hour %d: %v posts\n", hour+1, frequency[hour])
	}
}
