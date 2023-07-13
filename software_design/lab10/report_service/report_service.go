package report_service

import (
	"lab10/event_store"
	"time"

	"github.com/google/uuid"
)

type ReportService struct {
	stats               map[time.Weekday]int
	totalVisits         int
	totalClients        int
	clientIdToEnterTime map[uuid.UUID]time.Time
	totalDuration       time.Duration
	eventsCount         int
}

func NewReportService() *ReportService {
	stats := map[time.Weekday]int{
		time.Monday:    0,
		time.Tuesday:   0,
		time.Wednesday: 0,
		time.Thursday:  0,
		time.Friday:    0,
		time.Saturday:  0,
		time.Sunday:    0,
	}
	totalVisits, totalClients := 0, 0
	totalDuration := time.Duration(0)

	clientIdToEnterTime := make(map[uuid.UUID]time.Time)
	events := event_store.GetEvents()
	for _, event := range events {
		switch e := event.Data.(type) {
		case *event_store.ClientEntered:
			clientIdToEnterTime[event.ClientId] = e.Time
			stats[e.Time.Weekday()] += 1

		case *event_store.ClientLeft:
			totalVisits += 1
			totalDuration += e.Time.Sub(clientIdToEnterTime[event.ClientId])
		}
	}
	totalClients = len(clientIdToEnterTime)

	return &ReportService{stats, totalVisits, totalClients, clientIdToEnterTime, totalDuration, len(events)}
}

func (rs *ReportService) UpdateReportService(events []*event_store.Event) {
	for _, event := range events {
		switch e := event.Data.(type) {
		case *event_store.ClientEntered:
			rs.clientIdToEnterTime[event.ClientId] = e.Time
			rs.stats[e.Time.Weekday()] += 1

		case *event_store.ClientLeft:
			rs.totalVisits += 1
			duration := e.Time.Sub(rs.clientIdToEnterTime[event.ClientId])
			rs.totalDuration += duration
		}
	}

	rs.totalClients = len(rs.clientIdToEnterTime)
	rs.eventsCount += len(events)
}

func (rs *ReportService) GetVisitsStatisticsByDays() map[time.Weekday]int {
	rs.UpdateReportService(event_store.GetEvents()[rs.eventsCount:])
	return rs.stats
}

func (rs *ReportService) GetAverageFrequencyAndDuration() (int, time.Duration) {
	rs.UpdateReportService(event_store.GetEvents()[rs.eventsCount:])
	if rs.totalClients > 0 {
		return rs.totalVisits / rs.totalClients,
			time.Duration(int(rs.totalDuration) / rs.totalVisits)
	} else {
		return 0, 0
	}
}
