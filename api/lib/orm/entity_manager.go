package orm

import "github.com/go-gorp/gorp"
import "bytes"
import "fmt"

type EntityManager interface {
	Insert(entity interface{}) error
	Update(entity interface{}) error
	Delete(entity interface{}) error
	Select(entity interface{}, sql string, args map[string]interface{}) error
	Get(entity interface{}, sql string, args map[string]interface{}) error
	SetDebug(value bool)
	IsDebug() bool
	BindIn(args ...interface{}) (string, map[string]interface{})
}

type entityManager struct {
	db    *gorp.DbMap
	tx    *gorp.Transaction
	debug bool
}

func NewEntityManager(dbmap *gorp.DbMap) EntityManager {
	return &entityManager{db: dbmap}
}

func NewEntityManagerWithTransaction(dbmap *gorp.Transaction) EntityManager {
	return &entityManager{tx: dbmap}
}

func (e *entityManager) BindIn(args ...interface{}) (string, map[string]interface{}) {
	if len(args) == 0 {
		panic("Args is empty")
	}

	buffer := bytes.Buffer{}
	params := make(map[string]interface{}, 0)

	for i, _ := range args {
		buffer.WriteString(fmt.Sprintf("?%d", i+1))
		if (i + 1) < len(args) {
			buffer.WriteString(",")
		}
	}

	for i, v := range args {
		params[fmt.Sprintf("?%d", i+1)] = v
	}

	return buffer.String(), params
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

func (e *entityManager) Delete(entity interface{}) error {
	var err error

	if e.tx != nil {
		_, err = e.tx.Delete(entity)
	} else {
		_, err = e.db.Delete(entity)
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
