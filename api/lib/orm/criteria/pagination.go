package criteria

import "fmt"

type Page interface {
	ToSQL(i Param) string
	Values() map[string]interface{}
}

type pageBuilder struct {
	offset int64
	limit  int64
	idx1   int
	idx2   int
}

func (p *pageBuilder) ToSQL(i Param) string {
	p.idx1 = i.Index()
	p.idx2 = i.Index()

	return "\t" + fmt.Sprintf("OFFSET :p_%d LIMIT :p_%d", p.idx1, p.idx2)
}

func (p *pageBuilder) Values() map[string]interface{} {
	params := make(map[string]interface{})

	params[fmt.Sprintf("p_%d", p.idx1)] = p.offset
	params[fmt.Sprintf("p_%d", p.idx2)] = p.limit

	return params
}
