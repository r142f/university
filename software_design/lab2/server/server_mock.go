package server

import "fmt"

func getFrequency(hashtag string, n int, url string) ([]int, error) {
	frequency := make([]int, 0, n)

	for i := 0; i < n; i++ {
		responseBody, err := getTotalCount(url)
		if err != nil {
			return nil, fmt.Errorf("GetFrequency(%v, %v): %v", hashtag, n, err)
		}

		frequency = append(frequency, responseBody.Response.TotalCount)
	}

	for i := n - 1; i > 0; i-- {
		frequency[i] -= frequency[i-1]
	}

	return frequency, nil
}