package criteria

import "github.com/helderfarias/ges/api/lib/orm"

func NewQuery(em orm.EntityManager) QueryBuilder {
	return &queryBuilder{em: em}
}

func Asc(column string) OrderBy {
	return &orderBy{column: column, typ: "ASC"}
}

func Desc(column string) OrderBy {
	return &orderBy{column: column, typ: "DESC"}
}
