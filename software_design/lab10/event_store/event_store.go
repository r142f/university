package event_store

import (
	"bufio"
	"fmt"
	"os"
	"path"
	"time"

	"github.com/google/uuid"
)

var PATH = path.Join("event_store", "event_store.txt")

func ParseEvent(line string) *Event {
	clientId, eventType, date := "", "", ""
	fmt.Sscanf(line, "%v %v %v", &clientId, &date, &eventType)

	event := &Event{ClientId: uuid.MustParse(clientId)}
	switch eventType {
	case "SubscriptionIssued":
		due, _ := time.Parse(time.RFC3339, date)
		event.Data = &SubscriptionIssued{Due: due}
	case "SubscriptionRenewed":
		due, _ := time.Parse(time.RFC3339, date)
		event.Data = &SubscriptionRenewed{Due: due}
	case "ClientEntered":
		eventTime, _ := time.Parse(time.RFC3339, date)
		event.Data = &ClientEntered{Time: eventTime}
	case "ClientLeft":
		eventTime, _ := time.Parse(time.RFC3339, date)
		event.Data = &ClientLeft{Time: eventTime}
	}

	return event
}

func AddEvent(event *Event) {
	file, err := os.OpenFile(PATH, os.O_APPEND|os.O_RDWR, 0600)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	events := make([]*Event, 0)

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		events = append(events, ParseEvent(scanner.Text()))
	}

	if err := scanner.Err(); err != nil {
		panic(err)
	}

	err = file.Truncate(0)
	if err != nil {
		panic(err)
	}
	_, err = file.Seek(0, 0)
	if err != nil {
		panic(err)
	}

	events = append(events, event)
	for _, event := range events {
		fmt.Fprintf(file, "%v %v\n", event.ClientId, event.Data)
	}

}

func GetEvents() []*Event {
	file, err := os.Open(PATH)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	events := make([]*Event, 0)

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		events = append(events, ParseEvent(scanner.Text()))
	}

	if err := scanner.Err(); err != nil {
		panic(err)
	}

	return events
}
