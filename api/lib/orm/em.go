package orm

import "github.com/go-gorp/gorp"

type EntityManager interface {
	Insert(entity interface{}) error
	Select(entity interface{}, sql string) error
}

type entityManager struct {
	db *gorp.DbMap
}

func NewEntityManager(dbmap *gorp.DbMap) EntityManager {
	return &entityManager{db: dbmap}
}

func (e *entityManager) Insert(entity interface{}) error {
	return e.db.Insert(entity)
}

func (e *entityManager) Select(entity interface{}, sql string) error {
	_, err := e.db.Select(entity, sql)
	return err
}
