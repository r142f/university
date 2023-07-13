package main

import (
	"bufio"
	"crypto/sha256"
	"encoding/binary"
	"flag"
	"fmt"
	"log"
	"os"
)

var filename = flag.String("file", "", "file name with full name of students")
var numbilets = flag.Uint64("numbilets", 0, "number of questions")
var parameter = flag.Uint64("parameter", 0, "parameter that changes the fullNameToQuestion")

func main() {
	flag.Parse()

	file, err := os.Open(*filename)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	fullNameToQuestion := make(map[string]uint64)
	takenQuestions := make(map[uint64]struct{})

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		// in case all tickets are distributed, we go for the 2nd round
		if uint64(len(takenQuestions)) == *numbilets {
			takenQuestions = make(map[uint64]struct{})
		}

		fullName := scanner.Text()

		// if a question has already been selected for such a student,
		// we will return it
		question, ok := fullNameToQuestion[fullName]
		if ok {
			fmt.Printf("%s: %d\n", fullName, question+1)
			continue
		}

		// otherwise we count the question
		fullHash := sha256.Sum256([]byte(fullName + fmt.Sprint(*parameter)))
		cutHash := fullHash[32-8:]
		uintCutHash := binary.BigEndian.Uint64(cutHash)
		question = uintCutHash % *numbilets

		// if the question has already been used,
		// we are looking for the first unused one
		for _, ok := takenQuestions[question]; ok; _, ok = takenQuestions[question] {
			question = (question + 1) % *numbilets
		}

		fullNameToQuestion[fullName] = question
		takenQuestions[question] = struct{}{}

		fmt.Printf("%s: %d\n", fullName, question+1)
	}

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}
