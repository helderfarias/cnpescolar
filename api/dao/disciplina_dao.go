package dao

import "github.com/helderfarias/ges/api/dominio"
import "github.com/helderfarias/ges/api/dominio/criterio"
import "github.com/helderfarias/ges/api/lib/orm"

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

	err := d.em.Select(&disciplinas, "select * from disciplinas order by id")

	return disciplinas, err
}
