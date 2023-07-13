package graph

import (
	"bufio"
	"fmt"
	"math/rand"
	"os"
	"strings"
)

type AdjacencyMatrixGraph struct {
	*GeneralGraph
	adjacencyMatrix [][]int
}

func (graph *AdjacencyMatrixGraph) AddEdge(from, to int) {
	if _, ok := graph.Vertices[from]; !ok {
		graph.Vertices[from] = len(graph.Vertices)
	}

	if _, ok := graph.Vertices[to]; !ok {
		graph.Vertices[to] = len(graph.Vertices)
	}

	if len(graph.adjacencyMatrix) <= from {
		expandArea := make([][]int, from-len(graph.adjacencyMatrix)+1)
		graph.adjacencyMatrix = append(graph.adjacencyMatrix, expandArea...)
	}

	if len(graph.adjacencyMatrix[from]) <= to {
		expandArea := make([]int, to-len(graph.adjacencyMatrix[from])+1)
		graph.adjacencyMatrix[from] = append(graph.adjacencyMatrix[from], expandArea...)
	}

	graph.adjacencyMatrix[from][to] = 1
	graph.size = len(graph.Vertices)
}

func (graph *AdjacencyMatrixGraph) drawEdges() {
	for u := range graph.adjacencyMatrix {
		for v := range graph.adjacencyMatrix[u] {
			if graph.adjacencyMatrix[u][v] == 1 {
				x1, y1 := graph.getCoordinates(u)
				x2, y2 := graph.getCoordinates(v)

				graph.DrawingAPI.DrawLine(x1, y1, x2, y2)
			}
		}
	}
}

func (graph *AdjacencyMatrixGraph) DrawGraph() {
	graph.DrawingAPI.PaintBackground()
	graph.drawEdges()
	graph.drawVertices()
	graph.DrawingAPI.SaveToFile(fmt.Sprint("am_graph", rand.Intn(1e6), ".png"))
}

func (graph *AdjacencyMatrixGraph) ReadFromFile(path string) {
	file, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	for u := 0; scanner.Scan(); u++ {
		line := scanner.Text()
		values := strings.Split(line, " ")
		for v, value := range values {
			if value == "1" {
				graph.AddEdge(u, v)
			}
		}
	}

	if err := scanner.Err(); err != nil {
		panic(err)
	}
}
