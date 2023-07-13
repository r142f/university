package server

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	searchEngine := strings.ToLower(r.URL.Path[1:])
	results := []string{}
	for i := 1; i <= 5; i++ {
		results = append(results, fmt.Sprint(searchEngine, " answer ", i))
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(results)
}

func Start() {
	http.HandleFunc("/", Handler)

	log.Fatal(http.ListenAndServe("localhost:8000", nil))
}
