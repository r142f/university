package event_store

import (
	"fmt"
	"time"

	"github.com/google/uuid"
)

type Event struct {
	ClientId uuid.UUID
	Data     interface{}
}

type SubscriptionIssued struct {
	Due time.Time
}

func (event *SubscriptionIssued) String() string {
	return fmt.Sprint(event.Due.Format(time.RFC3339), " SubscriptionIssued")
}

type SubscriptionRenewed struct {
	Due time.Time
}

func (event *SubscriptionRenewed) String() string {
	return fmt.Sprint(event.Due.Format(time.RFC3339), " SubscriptionRenewed")
}

type ClientEntered struct {
	Time time.Time
}

func (event *ClientEntered) String() string {
	return fmt.Sprint(event.Time.Format(time.RFC3339), " ClientEntered")
}

type ClientLeft struct {
	Time time.Time
}

func (event *ClientLeft) String() string {
	return fmt.Sprint(event.Time.Format(time.RFC3339), " ClientLeft")
}
