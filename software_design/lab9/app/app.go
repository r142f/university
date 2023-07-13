package app

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/asynkron/protoactor-go/actor"
)

const (
	Google = "Google"
	Yandex = "Yandex"
	Bing   = "Bing"
)

const ReceiveTimeout = 3 * time.Second

var ServerAddress = "http://localhost:8000"

var SearchEngines = []string{Google, Yandex, Bing}

type Hello struct{ Who string }

type SearchQuery struct {
	SearchEngine string
	Query        string
}

type SearchAnswer struct {
	SearchEngine string
	Results      []string
}

type ChildActor struct{}

func (ca *ChildActor) Receive(context actor.Context) {
	if searchQuery, ok := context.Message().(SearchQuery); ok {
		resp, err := http.Get(fmt.Sprintf("%s/%s", ServerAddress, searchQuery.SearchEngine))
		if err != nil {
			panic(err)
		}
		defer resp.Body.Close()

		searchAnswer := SearchAnswer{
			SearchEngine: searchQuery.SearchEngine,
			Results:      []string{},
		}

		if err := json.NewDecoder(resp.Body).Decode(&searchAnswer.Results); err != nil {
			panic(err)
		}

		context.Respond(&searchAnswer)
		context.Stop(context.Self())
	}
}

type MasterActor struct {
	AggregatedAnswers []*SearchAnswer
	Invoker           *actor.PID
}

func (ma *MasterActor) Receive(context actor.Context) {
	switch msg := context.Message().(type) {
	case string:
		ma.Invoker = context.Sender()
		for _, searchEngine := range SearchEngines {
			props := actor.PropsFromProducer(func() actor.Actor { return &ChildActor{} })
			pid := context.Spawn(props)
			// fmt.Println("Created ", pid)
			context.Request(pid, SearchQuery{searchEngine, msg})
		}

		context.SetReceiveTimeout(ReceiveTimeout)

	case *SearchAnswer:
		// fmt.Println("Received query answer ", context.Message(), context.Sender(), context.Sender() != nil)
		ma.AggregatedAnswers = append(ma.AggregatedAnswers, msg)
		if len(ma.AggregatedAnswers) == 3 {
			context.Send(ma.Invoker, ma.AggregatedAnswers)
			context.Stop(context.Self())
		}

	case *actor.ReceiveTimeout:
		// fmt.Println("timed out")
		context.Send(ma.Invoker, ma.AggregatedAnswers)
	}
}

func Query(query string) []*SearchAnswer {
	system := actor.NewActorSystem()
	context := system.Root

	props := actor.PropsFromProducer(func() actor.Actor { return &MasterActor{} })
	pid := context.Spawn(props)

	result, _ := context.RequestFuture(pid, query, 30*time.Second).Result()
	context.Stop(pid)

	return result.([]*SearchAnswer)
}
