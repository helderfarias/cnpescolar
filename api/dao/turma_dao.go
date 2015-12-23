package dao

import "log"
import "github.com/helderfarias/ges/api/dominio"
import "github.com/helderfarias/ges/api/dominio/criterio"
import "github.com/helderfarias/ges/api/lib/orm"
import "github.com/helderfarias/ges/api/lib/orm/criteria"

type TurmaDAO interface {
	Salvar(turma *dominio.Turma) error
	Alterar(turma *dominio.Turma) error
	Excluir(id int64) error
	Filtrar(criterios *criterio.CriterioTurma) ([]*dominio.Turma, int64, error)
}

type turmaDAO struct {
	em orm.EntityManager
}

func NewTurmaDAO(em orm.EntityManager) TurmaDAO {
	return &turmaDAO{em: em}
}

func (d *turmaDAO) Salvar(turma *dominio.Turma) error {
	return d.em.Insert(turma)
}

func (d *turmaDAO) Alterar(turma *dominio.Turma) error {
	return d.em.Update(turma)
}

func (d *turmaDAO) Excluir(id int64) error {
	turma := dominio.Turma{Id: id}

	return d.em.Delete(&turma)
}

func (d *turmaDAO) Filtrar(criterios *criterio.CriterioTurma) ([]*dominio.Turma, int64, error) {
	turmas := make([]*dominio.Turma, 0)
	var total int64
	query := criteria.NewQuery(d.em)

	//consultar
	sql := query.Select("SELECT * FROM turmas")
	sql.Where(d.filtros(criterios))
	sql.Pagination(int64(criterios.Pagina), int64(criterios.Limite))
	sql.OrderBy(criteria.Asc("id"))
	err := sql.GetResultList(&turmas)
	if err != nil {
		log.Println(err)
	}

	//contar registros
	sql = query.Select("SELECT COUNT(*) FROM turmas")
	sql.Where(d.filtros(criterios))
	err = sql.GetSingleResult(&total)
	if err != nil {
		log.Println(err)
	}

	return turmas, total, err
}

func (d *turmaDAO) filtros(criterios *criterio.CriterioTurma) criteria.WhereArgs {
	return func(args criteria.Condition) {
		args.IsTrue(true, criteria.Translate("nome", criterios.Nome))
	}
}
