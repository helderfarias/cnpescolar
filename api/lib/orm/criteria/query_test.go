package criteria

func (t *CriteriaSuite) TestDeveriaConstruirClausulaSelect() {
	em := &entityManagerMock{}

	query := NewQuery(em)

	var list []interface{}

	query.Select("select * from dual").GetResultList(&list)

	t.NotNil(query)
}

func (t *CriteriaSuite) TestDeveriaCriarCriterioCompleto() {
	em := &entityManagerMock{}

	var list []interface{}

	query := NewQuery(em).Select("select * from dual")
	query.Where(func(args Condition) {
		args.IsTrue(true, Equals("id", 1))
		args.IsFalse(false, Equals("nome", "teste"))
	})
	query.Pagination(1, 2)
	query.OrderBy(Asc("id"))
	query.GetResultList(&list)

	t.NotNil(query)
}
