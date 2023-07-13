package manager_admin

import (
	"fmt"
	"lab10/clock"
	"lab10/event_store"
	"time"

	"github.com/google/uuid"
)

func GetSubscriptionInfo(clientId uuid.UUID) time.Time {
	var due time.Time

	for _, event := range event_store.GetEvents() {
		if event.ClientId == clientId {
			switch e := event.Data.(type) {
			case *event_store.SubscriptionIssued:
				due = e.Due
			case *event_store.SubscriptionRenewed:
				due = e.Due
			}
		}
	}

	return due
}

func IssueSubscription(clientId uuid.UUID) error {
	due := GetSubscriptionInfo(clientId)
	if !due.IsZero() {
		return fmt.Errorf("❌ subscription has already been issued")
	}

	date := clock.Clock.Now()

	event_store.AddEvent(
		&event_store.Event{
			ClientId: clientId,
			Data: &event_store.SubscriptionIssued{
				Due: date.Add(time.Hour * 24 * 30),
			},
		},
	)

	return nil
}

func RenewSubscription(clientId uuid.UUID, due time.Time) error {
	oldDue := GetSubscriptionInfo(clientId)
	if oldDue.IsZero() {
		return fmt.Errorf("❌ subscription hasn't been issued yet")
	}

	event_store.AddEvent(
		&event_store.Event{
			ClientId: clientId,
			Data: &event_store.SubscriptionRenewed{
				Due: due,
			},
		},
	)

	return nil
}
