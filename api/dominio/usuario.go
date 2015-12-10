package dominio

type Usuario struct {
	Id         int64    `db:"id" json:"id"`
	Login      string   `db:"login" json:"login"`
	Nome       string   `db:"nome" json:"nome"`
	Senha      string   `db:"senha" json:"-"`
	Permissoes []string `db:"-" json:"permissoes"`
}
