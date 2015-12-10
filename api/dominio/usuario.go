package dominio

type Usuario struct {
	ID         string   `db:"id" json:"id"`
	Nome       string   `db:"nome" json:"nome"`
	Senha      string   `db:"senha" json:"-"`
	Permissoes []string `db:"-" json:"permissoes"`
}
