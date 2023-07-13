package main

import (
	"image"

	"lab5/drawingAPI"
	"lab5/graph"
	"os"

	"github.com/fogleman/gg"
	"github.com/llgcode/draw2d/draw2dimg"
)

func main() {
	apiType := os.Args[1]
	graphType := os.Args[2]
	inputFile := os.Args[3]

	if len(os.Args) != 4 {
		panic("Wrong args! Proper usage: go run ./main [gg|draw2d] [el|am] [file]")
	}

	var api drawingAPI.DrawingAPI
	switch apiType {
	case "draw2d":
		image := image.NewRGBA(image.Rect(0, 0, 1024, 1024))
		graphicContext := draw2dimg.NewGraphicContext(image)
		api = &drawingAPI.Draw2dDrawingAPI{
			Image:          image,
			GraphicContext: graphicContext,
		}
	case "gg":
		api = &drawingAPI.GGDrawingAPI{
			Context: gg.NewContext(1024, 1024),
		}
	default:
		panic("Unknown api!")
	}

	var g graph.Graph

	switch graphType {
	case "el":
		g = &graph.EdgesListGraph{
			GeneralGraph: &graph.GeneralGraph{
				DrawingAPI: api,
				Vertices:   make(map[int]int),
			},
		}
	case "am":
		g = &graph.AdjacencyMatrixGraph{
			GeneralGraph: &graph.GeneralGraph{
				DrawingAPI: api,
				Vertices:   make(map[int]int),
			},
		}
	default:
		panic("Unknown graph storage method!")
	}

	g.ReadFromFile(inputFile)
	g.DrawGraph()
}
