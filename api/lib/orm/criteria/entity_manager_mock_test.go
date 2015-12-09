package criteria

type entityManagerMock struct {
}

func (e *entityManagerMock) Insert(entity interface{}) error {
	return nil
}

func (e *entityManagerMock) Select(entity interface{}, sql string) error {
	return nil
}
