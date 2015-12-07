package criteria

import "github.com/helderfarias/ges/api/lib/orm"

type QueryBuilder interface {
	Select(sql string) SelectBuilder
}

type queryBuilder struct {
	em orm.EntityManager
}

func (c *queryBuilder) Select(sql string) SelectBuilder {
	return &selectBuilder{sql: sql, em: c.em}
}
