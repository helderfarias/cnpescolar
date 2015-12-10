package dao

import (
	"log"

	"github.com/helderfarias/ges/api/dominio"
)
import "github.com/helderfarias/ges/api/dominio/criterio"
import "github.com/helderfarias/ges/api/lib/orm"
import "github.com/helderfarias/ges/api/lib/orm/criteria"

type DisciplinaDAO interface {
	Salvar(disciplina *dominio.Disciplina) error
	Filtrar(criterios *criterio.CriterioDisciplina) ([]dominio.Disciplina, int64, error)
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

func (d *disciplinaDAO) Filtrar(criterios *criterio.CriterioDisciplina) ([]dominio.Disciplina, int64, error) {
	var disciplinas []dominio.Disciplina
	var total int64
	query := criteria.NewQuery(d.em)

	//consultar
	sql := query.Select("SELECT * FROM disciplinas")
	sql.Where(d.filtros(criterios))
	sql.Pagination(int64(criterios.Pagina), int64(criterios.Limite))
	sql.OrderBy(criteria.Asc("id"))
	err := sql.GetResultList(&disciplinas)
	if err != nil {
		log.Println(err)
	}

	//contar registros
	sql = query.Select("SELECT COUNT(*) FROM disciplinas")
	sql.Where(d.filtros(criterios))
	err = sql.GetSingleResult(&total)
	if err != nil {
		log.Println(err)
	}

	return disciplinas, total, err
}

func (d *disciplinaDAO) filtros(criterios *criterio.CriterioDisciplina) criteria.WhereArgs {
	return func(args criteria.Condition) {
		args.IsTrue(true, criteria.Translate("nome", criterios.Nome))
	}
}
