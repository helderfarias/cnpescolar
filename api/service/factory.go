package service

import "github.com/helderfarias/ges/api/lib/orm"
import "github.com/helderfarias/ges/api/util"

type ServiceFactory interface {
	GetSegurancaService() SegurancaService
	GetDisciplinaService() DisciplinaService
	GetCursoService() CursoService
	GetTurmaService() TurmaService
}

type serviceFactory struct {
	segurancaService  SegurancaService
	disciplinaService DisciplinaService
	cursoService      CursoService
	turmaService      TurmaService
}

func NewServiceFactory(em orm.EntityManager, certs *util.Certified) ServiceFactory {
	factory := &serviceFactory{}
	factory.segurancaService = NewSegurancaService(em, certs)
	factory.disciplinaService = NewDisciplinaService(em)
	factory.cursoService = NewCursoService(em)
	factory.turmaService = NewTurmaService(em)
	return factory
}

func (s *serviceFactory) GetSegurancaService() SegurancaService {
	return s.segurancaService
}

func (s *serviceFactory) GetDisciplinaService() DisciplinaService {
	return s.disciplinaService
}

func (s *serviceFactory) GetCursoService() CursoService {
	return s.cursoService
}

func (s *serviceFactory) GetTurmaService() TurmaService {
	return s.turmaService
}
