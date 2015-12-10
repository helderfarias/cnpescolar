package criteria

type Expression interface {
	ToSQL(i Param) string
	Values() map[string]interface{}
}
