package criteria

import "fmt"

type betweenExpr struct {
	expr   string
	value1 interface{}
	value2 interface{}
	idx1   int
	idx2   int
}

func (e *betweenExpr) ToSQL(i Param) string {
	e.idx1 = i.Index()
	e.idx2 = i.Index()

	return fmt.Sprintf("%s BETWEEN :p_%d AND :p_%d", e.expr, e.idx1, e.idx2)
}

func (e *betweenExpr) Values() map[string]interface{} {
	params := make(map[string]interface{})
	params[fmt.Sprintf("p_%d", e.idx1)] = e.value1
	params[fmt.Sprintf("p_%d", e.idx2)] = e.value2
	return params
}
