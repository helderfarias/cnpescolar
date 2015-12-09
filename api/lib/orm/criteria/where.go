package criteria

import "bytes"

type WhereBuilder interface {
	ToSQL(index Param) string
	Values() map[string]interface{}
}

type whereBuilder struct {
	clausules []clausule
}

func (w *whereBuilder) ToSQL(index Param) string {
	var buffer bytes.Buffer

	buffer.WriteString("\r\n")
	buffer.WriteString("\tWHERE 1 = 1")

	for _, c := range w.clausules {
		buffer.WriteString("\r\n" + c.op.ToSQL(index))
	}

	return buffer.String()
}

func (w *whereBuilder) Values() map[string]interface{} {
	params := make(map[string]interface{})

	for _, c := range w.clausules {
		for idx, v := range c.values {
			params[":p_w_"+string(idx)] = v
		}
	}

	return params
}
