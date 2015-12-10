package criteria

func (t *CriteriaSuite) TestDeveriaConstruirClausulaSelect() {
	em := &entityManagerMock{}

	criteria := NewQuery(em)

	var list []interface{}

	criteria.Select("select * from dual").GetResultList(&list)

	t.NotNil(criteria)
}

func (t *CriteriaSuite) TestDeveriaCriarCriterioCompleto() {
	em := &entityManagerMock{}

	query := NewQuery(em)

	var list []interface{}

	query.Select("select * from dual")
	query.Where(func(args Condition) {
		args.IsTrue(true, Equals("id", 1))
		args.IsFalse(false, Equals("nome", "teste"))
	})
	query.Pagination(1, 2)
	query.OrderBy(Asc("id"))
	query.GetResultList(&list)

	t.NotNil(query)
}
