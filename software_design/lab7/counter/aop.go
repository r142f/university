package counter

import (
	"time"

	"github.com/gogap/aop"
)

var StartTime time.Time
var AddExecutionTime time.Duration
var TimesAddCalled int64

func (c *Counter) BeforeAdd(jp aop.JoinPointer) {
	StartTime = time.Now()
	TimesAddCalled++
}

func (c *Counter) AfterAdd(_ aop.JoinPointer) {
	AddExecutionTime += time.Since(StartTime)
}

func GetProxy(c *Counter) *aop.Proxy {
	TimesAddCalled = 0
	AddExecutionTime = 0

	beanFactory := aop.NewClassicBeanFactory()
	beanFactory.RegisterBean("counter", c)

	aspect := aop.NewAspect("aspect", "counter")
	aspect.SetBeanFactory(beanFactory)

	pointcut := aop.NewPointcut("pointcut").Execution(`Add()`)
	aspect.AddPointcut(pointcut)

	aspect.AddAdvice(&aop.Advice{Ordering: aop.Before, Method: "BeforeAdd", PointcutRefID: "pointcut"})
	aspect.AddAdvice(&aop.Advice{Ordering: aop.After, Method: "AfterAdd", PointcutRefID: "pointcut"})

	AOP := aop.NewAOP()
	AOP.SetBeanFactory(beanFactory)
	AOP.AddAspect(aspect)

	proxy, err := AOP.GetProxy("counter")
	if err != nil {
		panic(err)
	}

	return proxy
}
