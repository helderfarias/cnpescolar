package criteria

import "bytes"

type OrderBy interface {
	ToSQL() string
}

type orderBy struct {
	column string
	typ    string
}

func (o *orderBy) ToSQL() string {
	var buffer bytes.Buffer

	buffer.WriteString(o.column)
	buffer.WriteString(" ")
	buffer.WriteString(o.typ)

	return buffer.String()
}
