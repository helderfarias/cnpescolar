package dominio

import "github.com/helderfarias/ges/api/lib/orm/null"

type Turma struct {
	Id      int64       `db:"id" json:"id"`
	Nome    null.String `db:"nome" json:"nome"`
	CursoId null.Int    `db:"curso_id" json:"-"`
	Curso   *Curso      `db:"-" json:"curso"`
}
