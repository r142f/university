package graph

import (
	"fmt"
	"lab5/drawingAPI"
	"math"
)

type Graph interface {
	getCoordinates(v int) (float64, float64)
	drawEdges()
	drawVertices()
	ReadFromFile(path string)
	AddEdge(from, to int)
	DrawGraph()
}

type GeneralGraph struct {
	DrawingAPI drawingAPI.DrawingAPI
	Vertices   map[int]int
	size       int
}

func (graph *GeneralGraph) getCoordinates(v int) (float64, float64) {
	angle := 2.0 * math.Pi * float64(graph.Vertices[v]) / float64(graph.size)
	w, h := graph.DrawingAPI.CanvasSize()
	cx, cy := w/2, h/2
	radius := math.Min(w, h) / 3.0

	return cx + radius*math.Cos(angle), cy + radius*math.Sin(angle)
}

func (graph *GeneralGraph) drawVertices() {
	w, h := graph.DrawingAPI.CanvasSize()
	radius := math.Min(20, math.Min(w, h)/math.Pow(float64(graph.size), 2))
	
	for v := range graph.Vertices {
		cx, cy := graph.getCoordinates(v)
		graph.DrawingAPI.DrawCircle(cx, cy, radius)
		graph.DrawingAPI.DrawString(fmt.Sprint(v), cx, cy)
	}
} 