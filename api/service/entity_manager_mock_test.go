package service

type entityManagerMock struct {
}

func (e *entityManagerMock) Insert(entity interface{}) error {
	return nil
}

func (e *entityManagerMock) Select(entity interface{}, sql string, args map[string]interface{}) error {
	return nil
}

func (e *entityManagerMock) Get(entity interface{}, sql string, args map[string]interface{}) error {
	return nil
}
