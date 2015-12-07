package criteria

import "github.com/helderfarias/ges/api/lib/orm"

func NewCriteria(em orm.EntityManager) QueryBuilder {
	return &queryBuilder{em: em}
}

func Asc(column string) OrderBy {
	return &orderBy{column: column, typ: "ASC"}
}
