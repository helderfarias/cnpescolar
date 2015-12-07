package criteria

type Expression interface {
	ToSQL(i Param) string
	Values() []interface{}
}
