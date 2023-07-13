package main

import (
	"fmt"
	"lab10/clock"
	"lab10/event_store"
	"lab10/manager_admin"
	"lab10/report_service"
	"lab10/turnstile"
	"os"
	"path"
	"testing"
	"time"

	"github.com/google/uuid"
)

const TIME_LAYOUT = "2006-01-02T15:04:05"

func setup() *os.File {
	event_store.PATH = path.Join("event_store", "event_store_test.txt")
	f, err := os.Create(event_store.PATH)
	if err != nil {
		panic(err)
	}

	return f
}

func teardown(f *os.File) {
	f.Close()
	os.Remove(event_store.PATH)
}

func TestOneAccount(t *testing.T) {
	defer teardown(setup())

	clientId := uuid.New()

	if err := manager_admin.IssueSubscription(clientId); err != nil {
		panic(err)
	}

	if err := turnstile.LetClientIn(clientId); err != nil {
		panic(err)
	}

	if err := turnstile.LetClientIn(clientId); err == nil {
		panic(err)
	}

	if err := turnstile.LetClientOut(clientId); err != nil {
		panic(err)
	}

	if err := turnstile.LetClientOut(clientId); err == nil {
		panic(err)
	}

	if err := manager_admin.IssueSubscription(clientId); err == nil {
		panic(err)
	}
}

func TestStats(t *testing.T) {
	defer teardown(setup())

	now, _ := time.Parse(TIME_LAYOUT, "2023-01-02T15:04:05")
	setableClock := &clock.SetableClock{}
	clock.Clock = setableClock
	setableClock.SetNow(now)

	clientId := uuid.New()

	if err := manager_admin.IssueSubscription(clientId); err != nil {
		panic(err)
	}

	if err := turnstile.LetClientIn(clientId); err != nil {
		panic(err)
	}

	setableClock.SetNow(setableClock.Now().Add(time.Second * 40))

	if err := turnstile.LetClientOut(clientId); err != nil {
		panic(err)
	}

	rs := report_service.NewReportService()

	avFr, avDur := rs.GetAverageFrequencyAndDuration()
	if avFr != 1 || avDur != time.Second*40 {
		panic(
			fmt.Errorf(
				fmt.Sprintf(
					"Error! Expected average frequency %v = %v and average duration %v = %v",
					avFr, 1,
					avDur, time.Second*40,
				),
			),
		)
	}

	if err := turnstile.LetClientIn(clientId); err != nil {
		panic(err)
	}

	if err := turnstile.LetClientOut(clientId); err != nil {
		panic(err)
	}

	avFr, avDur = rs.GetAverageFrequencyAndDuration()
	if avFr != 2 || avDur != time.Second*20 {
		panic(
			fmt.Errorf(
				fmt.Sprintf(
					"Error! Expected average frequency %v = %v and average duration %v = %v",
					avFr, 2,
					avDur, time.Second*20,
				),
			),
		)
	}

	rs.GetAverageFrequencyAndDuration()
}

func TestTwoClients(t *testing.T) {
	defer teardown(setup())

	rs := report_service.NewReportService()
	now, _ := time.Parse(TIME_LAYOUT, "2023-01-02T15:04:05")
	setableClock := &clock.SetableClock{}
	clock.Clock = setableClock
	setableClock.SetNow(now)

	clientId1, clientId2 := uuid.New(), uuid.New()

	if err := manager_admin.IssueSubscription(clientId1); err != nil {
		panic(err)
	}

	if err := turnstile.LetClientIn(clientId1); err != nil {
		panic(err)
	}

	if err := turnstile.LetClientIn(clientId1); err == nil {
		panic(err)
	}

	if err := manager_admin.IssueSubscription(clientId2); err != nil {
		panic(err)
	}

	if err := turnstile.LetClientIn(clientId2); err != nil {
		panic(err)
	}

	if err := turnstile.LetClientIn(clientId2); err == nil {
		panic(err)
	}

	setableClock.SetNow(setableClock.Now().Add(time.Second * 40))

	if err := turnstile.LetClientOut(clientId1); err != nil {
		panic(err)
	}

	if err := turnstile.LetClientOut(clientId1); err == nil {
		panic(err)
	}

	if err := manager_admin.IssueSubscription(clientId1); err == nil {
		panic(err)
	}

	if err := turnstile.LetClientOut(clientId2); err != nil {
		panic(err)
	}

	if err := turnstile.LetClientOut(clientId2); err == nil {
		panic(err)
	}

	if err := manager_admin.IssueSubscription(clientId2); err == nil {
		panic(err)
	}

	avFr, avDur := rs.GetAverageFrequencyAndDuration()
	if avFr != 1 || avDur != time.Second*40 {
		panic(
			fmt.Errorf(
				fmt.Sprintf(
					"Error! Expected average frequency %v = %v and average duration %v = %v",
					avFr, 1,
					avDur, time.Second*40,
				),
			),
		)
	}
}
