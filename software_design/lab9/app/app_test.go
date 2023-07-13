package app

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"lab9/server"
)

func TestQuery(t *testing.T) {
	s := httptest.NewServer(http.HandlerFunc(server.Handler))
	ServerAddress = s.URL
	defer s.Close()

	result := Query("test")
	if len(result) != 3 {
		t.Errorf("FAILED: expected %v answers, got %v\n", 3, len(result))
	}
}

func TestSlowQuery(t *testing.T) {
	s := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !strings.Contains(r.URL.Path, SearchEngines[0]) {
			server.Handler(w, r)
		}
	}))
	ServerAddress = s.URL

	defer s.Close()

	result := Query("test")
	if len(result) != 2 {
		t.Errorf("FAILED: expected %v answers, got %v\n", 2, len(result))
	}
}
