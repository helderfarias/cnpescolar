package criteria

type Condition interface {
	IsTrue(value bool, expr Expression)
	Equals(column string, value interface{}) Expression
}

type condition struct {
	clausules []clausule
}

type clausule struct {
	op     Operator
	values []interface{}
}

func (c *condition) Equals(column string, value interface{}) Expression {
	return &equalsExpr{column: column, value: value}
}

func (q *condition) And(expr Expression) Operator {
	return &andOperador{expr: expr}
}

func (c *condition) IsTrue(value bool, expr Expression) {
	item := clausule{op: c.And(expr), values: expr.Values()}
	c.clausules = append(c.clausules, item)
}
