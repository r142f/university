package drawingAPI

type DrawingAPI interface {
	CanvasSize() (float64, float64)
	DrawCircle(cx, cy, radius float64)
	DrawLine(x1, y1, x2, y2 float64)
	DrawString(s string, x, y float64)
	PaintBackground()
	SaveToFile(name string)
}
