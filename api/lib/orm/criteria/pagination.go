package criteria

import "fmt"

type Page interface {
	ToSQL(i Param) string
	Values() map[string]interface{}
}

type pageBuilder struct {
	offset int64
	limit  int64
}

func (p *pageBuilder) ToSQL(i Param) string {
	return "\t" + fmt.Sprintf("OFFSET :p_p_1 LIMIT :p_p_2", i.Index(), i.Index())
}

func (p *pageBuilder) Values() map[string]interface{} {
	params := make(map[string]interface{})
	params[":p_p_1"] = p.offset
	params[":p_p_2"] = p.limit
	return params
}
