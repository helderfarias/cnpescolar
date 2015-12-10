package criteria

type Operator interface {
	ToSQL(i Param) string
	Values() map[string]interface{}
}
