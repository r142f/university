package graph

import (
	"bufio"
	"fmt"
	"math/rand"
	"os"
	"strconv"
	"strings"
)

type EdgesListGraph struct {
	*GeneralGraph
	edgesList [][2]int
}

func (graph *EdgesListGraph) AddEdge(from, to int) {
	graph.edgesList = append(graph.edgesList, [2]int{from, to})

	if _, ok := graph.Vertices[from]; !ok {
		graph.Vertices[from] = len(graph.Vertices)
	}

	if _, ok := graph.Vertices[to]; !ok {
		graph.Vertices[to] = len(graph.Vertices)
	}

	graph.size = len(graph.Vertices)
}

func (graph *EdgesListGraph) drawEdges() {
	for _, edge := range graph.edgesList {
		u, v := edge[0], edge[1]
		x1, y1 := graph.getCoordinates(u)
		x2, y2 := graph.getCoordinates(v)

		graph.DrawingAPI.DrawLine(x1, y1, x2, y2)
	}
}

func (graph *EdgesListGraph) DrawGraph() {
	graph.DrawingAPI.PaintBackground()
	graph.drawEdges()
	graph.drawVertices()
	graph.DrawingAPI.SaveToFile(fmt.Sprint("el_graph", rand.Intn(1e6), ".png"))
}

func (graph *EdgesListGraph) ReadFromFile(path string) {
	file, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		values := strings.Split(line, " ")
		u, err := strconv.Atoi(values[0])
		if err != nil {
			panic(err)
		}
		v, err := strconv.Atoi(values[1])
		if err != nil {
			panic(err)
		}

		graph.AddEdge(u, v)
	}

	if err := scanner.Err(); err != nil {
		panic(err)
	}
}
