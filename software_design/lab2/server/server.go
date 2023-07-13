package server

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"
	"time"
)

const ACCESS_TOKEN = "cacea5b9cacea5b9cacea5b95bc9dfef3accacecacea5b9a9afbbfc506b5338432a778d"
const MIN_N, MAX_N = 1, 24
const API_URL = "https://api.vk.com/method/newsfeed.search?count=0&v=5.131&access_token=%v&q=%v&start_time=%v"

type ResponseBody struct {
	Response struct {
		TotalCount int `json:"total_count"`
	}
}

func convertHoursToTimestamp(n int) int64 {
	return time.Now().Add(time.Duration(-n) * time.Hour).Unix()
}

func getUrl(hashtag string, n int) (string, error) {
	if n < MIN_N || n > MAX_N {
		return "", fmt.Errorf("getUrl(%v, %v): %v <= n <= %v must be true", hashtag, n, MIN_N, MAX_N)
	}

	if len(hashtag) == 0 {
		return "", fmt.Errorf("getUrl(%v, %v): hastag mustn't be empty", hashtag, n)
	}

	if !strings.HasPrefix(hashtag, "#") {
		hashtag = "#" + hashtag
	}

	query := url.QueryEscape(hashtag)
	timestamp := convertHoursToTimestamp(n)

	return fmt.Sprintf(API_URL, ACCESS_TOKEN, query, timestamp), nil
}

func getTotalCount(url string) (*ResponseBody, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("fetch: %v", err)
	}

	rawResponseBody, err := ioutil.ReadAll(resp.Body)
	resp.Body.Close()
	if err != nil {
		return nil, fmt.Errorf("fetch: reading %s: %v", url, err)
	}

	var responseBody ResponseBody
	if err := json.Unmarshal(rawResponseBody, &responseBody); err != nil {
		return nil, fmt.Errorf("unmarshal: parsing %b: %v", rawResponseBody, err)
	}

	fmt.Printf("TOTAL COUNT:%v, resoinse: %s\n", responseBody.Response.TotalCount, rawResponseBody)

	return &responseBody, nil
}

func GetFrequency(hashtag string, n int) ([]int, error) {
	frequency := make([]int, 0, n)

	for i := 0; i < n; i++ {
		url, err := getUrl(hashtag, i+1)
		if err != nil {
			return nil, fmt.Errorf("GetFrequency(%v, %v): %v", hashtag, n, err)
		}

		responseBody, err := getTotalCount(url)
		if err != nil {
			return nil, fmt.Errorf("GetFrequency(%v, %v): %v", hashtag, n, err)
		}

		frequency = append(frequency, responseBody.Response.TotalCount)
	}

	fmt.Println("freq", frequency)

	for i := n - 1; i > 0; i-- {
		frequency[i] -= frequency[i-1]
	}

	return frequency, nil
}
