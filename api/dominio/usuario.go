package dominio

type Usuario struct {
	ID         string   `json:"id"`
	Nome       string   `json:"nome"`
	Permissoes []string `json:"permissoes"`
}
