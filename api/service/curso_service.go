package service

import "github.com/helderfarias/ges/api/dominio"
import "github.com/helderfarias/ges/api/dominio/criterio"
import "github.com/helderfarias/ges/api/dao"
import "github.com/helderfarias/ges/api/lib/orm"

type CursoService interface {
	Consultar(criterio *criterio.CriterioCurso) ([]dominio.Curso, int64, error)
	Cadastrar(curso *dominio.Curso) error
	Alterar(curso *dominio.Curso) error
	Excluir(id int64) error
}

type cursoService struct {
	dao dao.CursoDAO
}

func NewCursoService(em orm.EntityManager) CursoService {
	return &cursoService{
		dao: dao.NewCursoDAO(em),
	}
}

func (d *cursoService) Consultar(criterio *criterio.CriterioCurso) ([]dominio.Curso, int64, error) {
	return d.dao.Filtrar(criterio)
}

func (d *cursoService) Cadastrar(curso *dominio.Curso) error {
	return d.dao.Salvar(curso)
}

func (d *cursoService) Alterar(curso *dominio.Curso) error {
	return d.dao.Alterar(curso)
}

func (d *cursoService) Excluir(id int64) error {
	return d.dao.Excluir(id)
}
