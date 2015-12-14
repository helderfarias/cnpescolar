package orm

import "github.com/go-gorp/gorp"

type EntityManager interface {
	Insert(entity interface{}) error
	Update(entity interface{}) error
	Select(entity interface{}, sql string, args map[string]interface{}) error
	Get(entity interface{}, sql string, args map[string]interface{}) error
	SetDebug(value bool)
	IsDebug() bool
}

type entityManager struct {
	db *gorp.DbMap
	tx *gorp.Transaction
	debug bool
}

func NewEntityManager(dbmap *gorp.DbMap) EntityManager {
	return &entityManager{db: dbmap}
}

func NewEntityManagerWithTransaction(dbmap *gorp.Transaction) EntityManager {
	return &entityManager{tx: dbmap}
}

func (e *entityManager) Update(entity interface{}) error {
	var err error

	if e.tx != nil {
		_, err = e.tx.Update(entity)
	} else {
		_, err = e.db.Update(entity)
	}

	return err
}

func (e *entityManager) Insert(entity interface{}) error {
	if e.tx != nil {
		return e.tx.Insert(entity)
	}

	return e.db.Insert(entity)
}

func (e *entityManager) Select(entity interface{}, sql string, args map[string]interface{}) error {
	var err error

	if e.tx != nil {
		_, err = e.tx.Select(entity, sql, args)
	} else {
		_, err = e.db.Select(entity, sql, args)
	}

	return err
}

func (e *entityManager) Get(entity interface{}, sql string, args map[string]interface{}) error {
	var err error

	if e.tx != nil {
		err = e.tx.SelectOne(entity, sql, args)
	} else {
		err = e.db.SelectOne(entity, sql, args)
	}

	return err
}

func (e *entityManager) SetDebug(value bool) {
	e.debug = value
}

func (e *entityManager) IsDebug() bool {
	return e.debug
}