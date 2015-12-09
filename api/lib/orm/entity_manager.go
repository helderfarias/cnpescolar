package orm

import "github.com/go-gorp/gorp"

type EntityManager interface {
	Insert(entity interface{}) error
	Select(entity interface{}, sql string, params map[string]interface{}) error
}

type entityManager struct {
	db *gorp.DbMap
	tx *gorp.Transaction
}

func NewEntityManager(dbmap *gorp.DbMap) EntityManager {
	return &entityManager{db: dbmap}
}

func NewEntityManagerWithTransaction(dbmap *gorp.Transaction) EntityManager {
	return &entityManager{tx: dbmap}
}

func (e *entityManager) Insert(entity interface{}) error {
	if e.tx != nil {
		return e.tx.Insert(entity)
	}
	return e.db.Insert(entity)
}

func (e *entityManager) Select(entity interface{}, sql string, params map[string]interface{}) error {
	if e.tx != nil {
		_, err := e.tx.Select(entity, sql, params)
		return err
	}

	_, err := e.db.Select(entity, sql, params)
	return err
}
