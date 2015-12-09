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

	criteria := NewQuery(em)

	var list []interface{}

	sql := criteria.Select("select * from dual")
	sql.Where(func(args Condition) {
		args.IsTrue(true, args.Equals("id", 1))
		args.IsTrue(false, args.Equals("nome", "teste"))
	})
	sql.OrderBy(Asc("id"))
	sql.GetResultList(&list)

	t.NotNil(criteria)
}
