package main

import (
	"fmt"
	"lab10/manager_admin"
	"lab10/report_service"
	"lab10/turnstile"
	"time"

	"github.com/google/uuid"
)

func main() {
	clientId := uuid.New()
	rs := report_service.NewReportService()
loop:
	for {
		command, err, succ := "", error(nil), "✅"
		fmt.Scanln(&command)
		switch command {
		case "issue":
			err = manager_admin.IssueSubscription(clientId)
		case "renew":
			err = manager_admin.RenewSubscription(clientId, time.Now().Add(time.Hour*24*30))
		case "enter":
			err = turnstile.LetClientIn(clientId)
		case "leave":
			err = turnstile.LetClientOut(clientId)
		case "info":
			due := manager_admin.GetSubscriptionInfo(clientId)
			if due.IsZero() {
				err = fmt.Errorf("❌ client has no subscription")
			} else {
				succ = fmt.Sprintf("✅ Client ID: %v, Due: %v", clientId, due)
			}
		case "stat":
			averageFrequency, duration := rs.GetAverageFrequencyAndDuration()
			succ = fmt.Sprintf("✅ %v\naverage frequency: %v, average duration: %v", rs.GetVisitsStatisticsByDays(), averageFrequency, duration)
		case "stop":
			break loop
		default:
			err = fmt.Errorf("❌ unknown command")
		}

		if err != nil {
			fmt.Println(err)
		} else {
			fmt.Println(succ)
		}

	}
}
