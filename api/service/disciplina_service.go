package service

import "github.com/helderfarias/ges/api/dominio"
import "github.com/helderfarias/ges/api/dominio/criterio"
import "github.com/helderfarias/ges/api/dao"
import "github.com/helderfarias/ges/api/lib/orm"

type DisciplinaService interface {
	Consultar(criterio *criterio.CriterioDisciplina) ([]dominio.Disciplina, int64, error)
	Cadastrar(disciplina *dominio.Disciplina) error
}

type disciplinaService struct {
	dao dao.DisciplinaDAO
}

func NewDisciplinaService(em orm.EntityManager) DisciplinaService {
	return &disciplinaService{
		dao: dao.NewDisciplinaDAO(em),
	}
}

func (d *disciplinaService) Consultar(criterio *criterio.CriterioDisciplina) ([]dominio.Disciplina, int64, error) {
	return d.dao.Filtrar(criterio)
}

func (d *disciplinaService) Cadastrar(disciplina *dominio.Disciplina) error {
	return d.dao.Salvar(disciplina)
}
