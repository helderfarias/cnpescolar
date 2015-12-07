package criteria

type indexBuilder struct {
	index int
}

func (i *indexBuilder) Index() int {
	i.index = i.index + 1
	return i.index
}
