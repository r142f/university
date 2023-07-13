package LRUCache

import (
	"container/list"
	"lab1/Utils"
)

type listElementValue[K comparable, V any] struct {
	key   *K
	value *V
}

type LRUCache[K comparable, V any] struct {
	hashMap    map[K]*list.Element
	linkedList *list.List
	capacity   int
	length     int
}

func Constructor[K comparable, V any](capacity int) LRUCache[K, V] {
	Utils.AssertGreater(capacity, 0)

	lrucache := LRUCache[K, V]{
		hashMap:    map[K]*list.Element{},
		linkedList: list.New(),
		capacity:   capacity,
		length:     0,
	}

	return lrucache
}

func (this *LRUCache[K, V]) Get(key K) V {
	element, ok := this.hashMap[key]

	Utils.AssertEqual(ok, true)

	this.linkedList.MoveToBack(element)

	return *element.Value.(listElementValue[K, V]).value
}

func (this *LRUCache[K, V]) Put(key K, value V) {
	Utils.AssertLowerOrEqual(this.length, this.capacity)
	Utils.AssertEqual(len(this.hashMap), this.length)
	Utils.AssertEqual(this.linkedList.Len(), this.length)

	if oldElement, ok := this.hashMap[key]; ok {
		this.linkedList.Remove(oldElement)
	} else if this.length == this.capacity {
		latestUsedElement := this.linkedList.Front()
		this.linkedList.Remove(latestUsedElement)
		delete(this.hashMap, *latestUsedElement.Value.(listElementValue[K, V]).key)
	} else {
		this.length++
	}

	element := this.linkedList.PushBack(listElementValue[K, V]{&key, &value})
	this.hashMap[key] = element
}
