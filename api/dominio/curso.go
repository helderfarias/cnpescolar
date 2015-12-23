package dominio

import "github.com/helderfarias/ges/api/lib/orm/null"

type Curso struct {
	Id    null.Int    `db:"id" json:"id"`
	Nome  null.String `db:"nome" json:"nome"`
	Nivel null.Int    `db:"nivel_id" json:"nivel_id"`
}
