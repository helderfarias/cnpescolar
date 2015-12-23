package service

import (
	"log"

	"github.com/helderfarias/ges/api/dominio"
)

import "github.com/helderfarias/ges/api/dominio/criterio"
import "github.com/helderfarias/ges/api/dao"
import "github.com/helderfarias/ges/api/lib/orm"

type TurmaService interface {
	Consultar(criterio *criterio.CriterioTurma) ([]*dominio.Turma, int64, error)
	Cadastrar(turma *dominio.Turma) error
	Alterar(turma *dominio.Turma) error
	Excluir(id int64) error
}

type turmaService struct {
	turmaDAO dao.TurmaDAO
	cursoDAO dao.CursoDAO
}

func NewTurmaService(em orm.EntityManager) TurmaService {
	return &turmaService{
		turmaDAO: dao.NewTurmaDAO(em),
		cursoDAO: dao.NewCursoDAO(em),
	}
}

func (d *turmaService) Consultar(criterio *criterio.CriterioTurma) ([]*dominio.Turma, int64, error) {
	turmas, total, err := d.turmaDAO.Filtrar(criterio)

	var cursoIds []int64
	for _, turma := range turmas {
		cursoIds = append(cursoIds, turma.CursoId.Int64)
		turma.Curso = &dominio.Curso{}
	}

	cursos, err := d.cursoDAO.Consultar(cursoIds)
	for _, curso := range cursos {
		log.Println(curso)
	}

	return turmas, total, err
}

func (d *turmaService) Cadastrar(turma *dominio.Turma) error {
	return d.turmaDAO.Salvar(turma)
}

func (d *turmaService) Alterar(turma *dominio.Turma) error {
	return d.turmaDAO.Alterar(turma)
}

func (d *turmaService) Excluir(id int64) error {
	return d.turmaDAO.Excluir(id)
}
