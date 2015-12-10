package criteria

import "fmt"

type equalsExpr struct {
	expr  string
	value interface{}
	idx   int
}

func (e *equalsExpr) ToSQL(i Param) string {
	e.idx = i.Index()
	return fmt.Sprintf("%s = :p_%d", e.expr, e.idx)
}

func (p *equalsExpr) Values() map[string]interface{} {
	params := make(map[string]interface{})
	params[fmt.Sprintf("p_%d", p.idx)] = p.value
	return params
}
