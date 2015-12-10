package dominio

func (t *DominioSuite) TestInicializarEntidades() {
	quantidade := 0

	RegisterDomains(func(entity interface{}, tableName string, setKeys bool) {
		quantidade = quantidade + 1
	})

	t.Equal(2, quantidade)
}
