package drawingAPI

import (
	"github.com/llgcode/draw2d"
	"github.com/llgcode/draw2d/draw2dimg"
	"github.com/llgcode/draw2d/draw2dkit"
	"image"
	"image/color"
	"lab5/utils"
	"path/filepath"
)

type Draw2dDrawingAPI struct {
	Image          *image.RGBA
	GraphicContext *draw2dimg.GraphicContext
}

func (api *Draw2dDrawingAPI) CanvasSize() (float64, float64) {
	return float64(api.Image.Rect.Size().X), float64(api.Image.Rect.Size().Y)
}

func (api *Draw2dDrawingAPI) DrawString(s string, x, y float64) {
	if draw2d.GetFontFolder() != "resource1/font" {
		draw2d.SetFontFolder("resource/font")
	}

	api.GraphicContext.SetFillColor(color.RGBA{255, 40, 40, 255})
	_, top, right, _ := api.GraphicContext.GetStringBounds(s)

	api.GraphicContext.FillStringAt(s, x-(right)/2, y-(top)/2)
}

func (api *Draw2dDrawingAPI) DrawCircle(cx, cy, radius float64) {
	api.GraphicContext.SetFillColor(color.RGBA{40, 255, 255, 255})
	draw2dkit.Circle(api.GraphicContext, cx, cy, radius)
	api.GraphicContext.FillStroke()
}

func (api *Draw2dDrawingAPI) DrawLine(x1, y1, x2, y2 float64) {
	api.GraphicContext.SetStrokeColor(color.RGBA{68, 68, 68, 255})
	api.GraphicContext.BeginPath()
	api.GraphicContext.MoveTo(x1, y1)
	api.GraphicContext.LineTo(x2, y2)
	api.GraphicContext.Close()
	api.GraphicContext.FillStroke()
}

func (api *Draw2dDrawingAPI) PaintBackground() {
	api.GraphicContext.SetStrokeColor(color.RGBA{255, 255, 255, 255})
	x2, y2 := api.CanvasSize()
	draw2dkit.Rectangle(api.GraphicContext, 0, 0, x2, y2)
	api.GraphicContext.FillStroke()
}

func (api *Draw2dDrawingAPI) SaveToFile(name string) {
	generatedDirname := "generated"
	utils.CreateDirIfNotExists(generatedDirname)
	draw2dimg.SaveToPngFile(filepath.Join(generatedDirname, "draw2d_"+name), api.Image)
}
