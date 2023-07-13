package server

import (
	"errors"
	"fmt"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"
)

func TestGetUrl(t *testing.T) {
	tests := []struct {
		hashtag     string
		n           int
		expectError bool
	}{
		{"кот", 0, true},
		{"кот", 25, true},
		{"", 5, true},
		{"кот", 5, false},
	}

	for _, test := range tests {
		if _, err := getUrl(test.hashtag, test.n); test.expectError && err == nil {
			t.Errorf("FAILED: expected error in GetUtl(%v, %v)\n", test.hashtag, test.n)
		} else if !test.expectError && err != nil {
			t.Errorf("FAILED: unexpected error in GetUtl(%v, %v) %v\n", test.hashtag, test.n, err)
		}
	}
}

func TestGetTotalCount(t *testing.T) {
	tests := []struct {
		server        *httptest.Server
		response      *ResponseBody
		expectedError error
	}{
		{
			server: httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
				w.WriteHeader(http.StatusOK)
				w.Write([]byte(`{"response":{"total_count":110}}`))
			})),
			response: &ResponseBody{
				Response: struct {
					TotalCount int `json:"total_count"`
				}{
					TotalCount: 110,
				},
			},
			expectedError: nil,
		},
	}

	for _, test := range tests {
		defer test.server.Close()

		resp, err := getTotalCount(test.server.URL)

		if !errors.Is(err, test.expectedError) {
			t.Errorf("Expected error FAILED: expected %v got %v\n", test.expectedError, err)
		}

		if !reflect.DeepEqual(resp, test.response) {
			t.Errorf("FAILED: expected %v, got %v\n", test.response, resp)
		}
	}
}

func TestGetFrequency(t *testing.T) {
	tests := []struct {
		server         *httptest.Server
		hashtag        string
		n              int
		expectedResult []int
		expectedError  error
	}{
		{
			server: httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, _ *http.Request) {
				w.WriteHeader(http.StatusOK)
				w.Write([]byte(`{"response":{"total_count":110}}`))
			})),
			hashtag:        "meow",
			n:              5,
			expectedResult: []int{110, 0, 0, 0, 0},
			expectedError:  nil,
		},
	}

	for _, test := range tests {
		defer test.server.Close()

		res, err := getFrequency(test.hashtag, test.n, test.server.URL)

		if !errors.Is(err, test.expectedError) {
			t.Errorf("Expected error FAILED: expected %v got %v\n", test.expectedError, err)
		}
		fmt.Println(test.expectedResult, res, reflect.DeepEqual(res, test.expectedResult))

		if !reflect.DeepEqual(res, test.expectedResult) {
			t.Errorf("FAILED: expected %v, got %v\n", test.expectedResult, res)
		}
	}
}
