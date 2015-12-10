package criteria

type Condition interface {
	IsTrue(value bool, expr Expression)
	IsFalse(value bool, expr Expression)
}

type condition struct {
	clausules []Operator
}

func (c *condition) IsTrue(value bool, expr Expression) {
	if value {
		c.clausules = append(c.clausules, And(expr))
	}
}

func (c *condition) IsFalse(value bool, expr Expression) {
	if !value {
		c.clausules = append(c.clausules, And(expr))
	}
}
