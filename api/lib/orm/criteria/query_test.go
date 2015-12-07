package criteria

func (t *CriteriaSuite) TestDeveriaConstruirClausulaSelect() {
	criteria := &queryBuilder{}

	var list []interface{}

	criteria.Select("select * from dual").GetResultList(&list)

	t.NotNil(criteria)
}

func (t *CriteriaSuite) TestDeveriaConstruirClausulaWhere() {
	criteria := &queryBuilder{}

	sql := criteria.Select("select * from dual")
	sql.Where(func(args Condition) {
		args.IsTrue(true, args.Equals("id", 1))
		args.IsTrue(true, args.Equals("nome", "teste"))
	})
	sql.OrderBy(Asc("id"))
	sql.GetResultList(nil)

	t.NotNil(criteria)
}
