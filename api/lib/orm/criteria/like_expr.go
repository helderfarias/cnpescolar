package criteria

import "fmt"

type translateExpr struct {
	expr  string
	value interface{}
	idx   int
}

func (e *translateExpr) ToSQL(i Param) string {
	e.idx = i.Index()

	from := "ÁÀÂÃÄáàâãäÉÈÊËéèêëÍÌÎÏíìîïÓÒÕÔÖóòôõöÚÙÛÜúùûüÇç"
	to := "AAAAAaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUUuuuuÇc"

	return fmt.Sprintf("UPPER(TRANSLATE(%s,'%s','%s')) LIKE '%s' || UPPER(:p_%d) || '%s'", e.expr, from, to, "%", e.idx, "%")
}

func (e *translateExpr) Values() map[string]interface{} {
	params := make(map[string]interface{})
	params[fmt.Sprintf("p_%d", e.idx)] = e.value
	return params
}
