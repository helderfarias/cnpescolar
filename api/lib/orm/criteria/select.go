package criteria

import "github.com/helderfarias/ges/api/lib/orm"
import "log"

type SelectBuilder interface {
	Where(args WhereArgs)
	OrderBy(o OrderBy)
	GetResultList(list interface{})
}

type selectBuilder struct {
	sql   string
	where WhereBuilder
	order OrderBy
	em    orm.EntityManager
}

type WhereArgs func(Condition)

func (s *selectBuilder) Where(args WhereArgs) {
	items := &condition{}
	items.clausules = make([]clausule, 0)
	args(items)

	s.where = &whereBuilder{clausules: items.clausules}
}

func (s *selectBuilder) OrderBy(o OrderBy) {
}

func (s *selectBuilder) GetResultList(list interface{}) {
	index := &indexBuilder{}

	log.Println(s.sql)

	if s.where != nil {
		log.Println(s.where.toSQL(index))
	}

	if s.order != nil {
		log.Println(s.order)
	}
}
