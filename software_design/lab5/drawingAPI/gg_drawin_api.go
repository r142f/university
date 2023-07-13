package drawingAPI

import (
	"github.com/fogleman/gg"
	"lab5/utils"
	"path/filepath"
)

type GGDrawingAPI struct {
	Context *gg.Context
}

func (api *GGDrawingAPI) CanvasSize() (float64, float64) {
	size := api.Context.Image().Bounds().Size()
	return float64(size.X), float64(size.Y)
}

func (api *GGDrawingAPI) DrawString(s string, x, y float64) {
	w, h := api.Context.MeasureString(s)
	api.Context.SetRGB255(255, 40, 40)
	api.Context.DrawString(s, x-w/2, y+h/4)
}

func (api *GGDrawingAPI) DrawCircle(cx, cy, radius float64) {
	api.Context.DrawCircle(cx, cy, radius)
	api.Context.SetRGB255(40, 255, 255)
	api.Context.Fill()
}

func (api *GGDrawingAPI) DrawLine(x1, y1, x2, y2 float64) {
	api.Context.DrawLine(x1, y1, x2, y2)
	api.Context.SetRGB255(68, 68, 68)
	api.Context.Stroke()
}

func (api *GGDrawingAPI) PaintBackground() {
	w, h := api.CanvasSize()
	api.Context.DrawRectangle(0, 0, w, h)
	api.Context.SetRGB255(255, 255, 255)
	api.Context.Fill()
}

func (api *GGDrawingAPI) SaveToFile(name string) {
	generatedDirname := "generated"
	utils.CreateDirIfNotExists(generatedDirname)
	api.Context.SavePNG(filepath.Join(generatedDirname, "gg_"+name))
}
