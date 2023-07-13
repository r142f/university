package turnstile

import (
	"fmt"
	"lab10/clock"
	"lab10/event_store"

	"github.com/google/uuid"
)

func LetClientIn(clientId uuid.UUID) error {
	inEventsCount, outEventsCount := 0, 0
	for _, event := range event_store.GetEvents() {
		if event.ClientId == clientId {
			switch event.Data.(type) {
			case *event_store.ClientEntered:
				inEventsCount += 1
			case *event_store.ClientLeft:
				outEventsCount += 1
			}
		}
	}

	if inEventsCount != outEventsCount {
		return fmt.Errorf("❌ client has already entered")
	}

	event_store.AddEvent(
		&event_store.Event{
			ClientId: clientId,
			Data: &event_store.ClientEntered{
				Time: clock.Clock.Now(),
			},
		},
	)

	return nil
}

func LetClientOut(clientId uuid.UUID) error {
	inEventsCount, outEventsCount := 0, 0
	for _, event := range event_store.GetEvents() {
		if event.ClientId == clientId {
			switch event.Data.(type) {
			case *event_store.ClientEntered:
				inEventsCount += 1
			case *event_store.ClientLeft:
				outEventsCount += 1
			}
		}
	}

	if inEventsCount != outEventsCount+1 {
		return fmt.Errorf("❌ client has already left")
	}

	event_store.AddEvent(
		&event_store.Event{
			ClientId: clientId,
			Data: &event_store.ClientLeft{
				Time: clock.Clock.Now(),
			},
		},
	)

	return nil
}
