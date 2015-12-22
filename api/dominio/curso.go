package dominio

type Curso struct {
	Id   int64  `db:"id" json:"id"`
	Nome string `db:"nome" json:"nome"`
    Nivel int64 `db:"nivel_id" json:"nivel_id"`
}
