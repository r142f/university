package LRUCache

import (
	"fmt"
	"lab1/Utils"
	"testing"
)

func TestUsage(t *testing.T) {
	lruCache := Constructor[int, int](2)

	lruCache.Put(1, 1)
	lruCache.Put(2, 2)
	Utils.AssertEqual(lruCache.Get(1), 1)

	lruCache.Put(3, 3)
	lruCache.Put(4, 4)
	Utils.AssertEqual(lruCache.Get(3), 3)
	Utils.AssertEqual(lruCache.Get(4), 4)
}

func TestMeetLimit(t *testing.T) {
	lruCache := Constructor[int, int](100)

	for i := 0; i < 100; i++ {
		lruCache.Put(i, i)
	}

	for i := 99; i >= 0; i-- {
		Utils.AssertEqual(i, lruCache.Get(i))
	}
}

func TestExceedLimit(t *testing.T) {
	lruCache := Constructor[int, string](10)

	for i := 0; i < 100; i++ {
		lruCache.Put(i, fmt.Sprint(i))
	}

	for i := 90; i < 100; i++ {
		Utils.AssertEqual(fmt.Sprint(i), lruCache.Get(i))
	}
}
