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

	sql := criteria.NewQuery(d.em).Select("select * from disciplinas")
	sql.Pagination(int64(criterios.Pagina), int64(criterios.Limite))
	sql.OrderBy(criteria.Asc("id"))

	err := sql.GetResultList(&disciplinas)

	return disciplinas, err
}
