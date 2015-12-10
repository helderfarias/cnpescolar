package criteria

import "github.com/helderfarias/ges/api/lib/orm"

type QueryBuilder interface {
	Select(sql string) SelectBuilder
	Where(args WhereArgs)
	OrderBy(o OrderBy)
	Pagination(offset int64, limit int64)
	GetResultList(list interface{}) error
}

type queryBuilder struct {
	em  orm.EntityManager
	sql SelectBuilder
}

func (c *queryBuilder) Select(sql string) SelectBuilder {
	c.sql = &selectBuilder{sql: sql, em: c.em}
	return c.sql
}

func (s *queryBuilder) Where(args WhereArgs) {
	if s.sql == nil {
		panic("the 'Select' method was not invoked")
	}

	s.sql.Where(args)
}

func (s *queryBuilder) Pagination(offset int64, limit int64) {
	if s.sql == nil {
		panic("the 'Select' method was not invoked")
	}

	s.sql.Pagination(offset, limit)
}

func (s *queryBuilder) OrderBy(o OrderBy) {
	if s.sql == nil {
		panic("the 'Select' method was not invoked")
	}

	s.sql.OrderBy(o)
}

func (s *queryBuilder) GetResultList(list interface{}) error {
	if s.sql == nil {
		panic("the 'Select' method was not invoked")
	}

	return s.sql.GetResultList(list)
}
