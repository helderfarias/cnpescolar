package criteria

import "fmt"

type equalsExpr struct {
	column string
	value  interface{}
}

func (e *equalsExpr) ToSQL(i Param) string {
	return fmt.Sprintf("%s = $%d", e.column, i.Index())
}

func (e *equalsExpr) Values() []interface{} {
	return []interface{}{e.value}
}
