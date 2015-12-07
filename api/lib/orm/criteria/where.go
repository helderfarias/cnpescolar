package criteria

import "bytes"

type WhereBuilder struct {
	toSQL(index Param) string 
}

type whereBuilder struct {
	clausules []clausule
}

func (w *whereBuilder) toSQL(index Param) string {
	var buffer bytes.Buffer

	buffer.WriteString("\r\n")
	buffer.WriteString("\tWHERE 1 = 1")

	for _, c := range w.clausules {
		buffer.WriteString("\r\n" + c.op.ToSQL(index))
	}

	return buffer.String()
}
