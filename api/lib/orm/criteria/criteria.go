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

func Or(expr Expression) Operator {
	return &orOperador{expr: expr}
}

func And(expr Expression) Operator {
	return &andOperador{expr: expr}
}

func Equals(expr string, value interface{}) Expression {
	return &equalsExpr{expr: expr, value: value}
}

func NotEquals(expr string, value interface{}) Expression {
	return &notEqualsExpr{expr: expr, value: value}
}

func Between(expr string, value1, value2 interface{}) Expression {
	return &betweenExpr{expr: expr, value1: value1, value2: value2}
}

func Translate(expr string, value interface{}) Expression {
	return &translateExpr{expr: expr, value: value}
}
