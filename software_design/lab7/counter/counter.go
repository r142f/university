package counter

type Counter struct {
	IncreaseNum int
}

func (counter *Counter) Add(a, b int) int {
	result := 0

	for result < a+b {
		result = result + counter.IncreaseNum
	}
	for result > a + b {
		result--
	}

	return result
}

var SlowCounter = &Counter{IncreaseNum: 1}
var FastCounter = &Counter{IncreaseNum: 100}
