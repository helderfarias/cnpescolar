package criteria

type andOperador struct {
	expr Expression
}

func (a *andOperador) ToSQL(i Param) string {
	return "\t  AND (" + a.expr.ToSQL(i) + ")"
}

func (a *andOperador) Values() map[string]interface{} {
	return a.expr.Values()
}
