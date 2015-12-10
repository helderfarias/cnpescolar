package dao

import "github.com/helderfarias/ges/api/dominio"
import "github.com/helderfarias/ges/api/dominio/criterio"
import "github.com/helderfarias/ges/api/lib/orm"
import "github.com/helderfarias/ges/api/lib/orm/criteria"

type DisciplinaDAO interface {
	Salvar(disciplina *dominio.Disciplina) error
	Filtrar(criterios *criterio.CriterioDisciplina) ([]dominio.Disciplina, error)
}

type disciplinaDAO struct {
	em orm.EntityManager
}

func NewDisciplinaDAO(em orm.EntityManager) DisciplinaDAO {
	return &disciplinaDAO{em: em}
}

func (d *disciplinaDAO) Salvar(disciplina *dominio.Disciplina) error {
	return d.em.Insert(disciplina)
}

func (d *disciplinaDAO) Filtrar(criterios *criterio.CriterioDisciplina) ([]dominio.Disciplina, error) {
	var disciplinas []dominio.Disciplina

	query := criteria.NewQuery(d.em)
	query.Select("SELECT * FROM disciplinas")
	query.Where(func(args criteria.Condition) {
		args.IsTrue(true, criteria.Translate("nome", criterios.Nome))
	})
	query.OrderBy(criteria.Asc("id"))

	err := query.GetResultList(&disciplinas)

	return disciplinas, err
}
