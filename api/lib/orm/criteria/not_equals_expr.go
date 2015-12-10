package criteria

import "fmt"

type notEqualsExpr struct {
	expr  string
	value interface{}
	idx   int
}

func (e *notEqualsExpr) ToSQL(i Param) string {
	e.idx = i.Index()

	return fmt.Sprintf("%s <> :p_%d", e.expr, e.idx)
}

func (e *notEqualsExpr) Values() map[string]interface{} {
	params := make(map[string]interface{})
	params[fmt.Sprintf("p_%d", e.idx)] = e.value
	return params
}
