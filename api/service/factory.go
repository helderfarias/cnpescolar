package service

import "github.com/helderfarias/ges/api/dao"
import "github.com/helderfarias/ges/api/lib/orm"
import "github.com/helderfarias/ges/api/util"

type ServiceFactory interface {
    GetSegurancaService() SegurancaService
	GetDisciplinaService() DisciplinaService
    GetCursoService() CursoService
}

type serviceFactory struct {
    segurancaService  SegurancaService
	disciplinaService DisciplinaService
    cursoService  CursoService
}

func NewServiceFactory(em orm.EntityManager, certs *util.Certified) ServiceFactory {
	factory := &serviceFactory{}

    factory.segurancaService = &segurancaService{
        dao:  dao.NewUsuarioDAO(em),
        cert: certs,
    }

	factory.disciplinaService = &disciplinaService{
		dao: dao.NewDisciplinaDAO(em),
	}

    factory.cursoService = &cursoService{
        dao: dao.NewCursoDAO(em),
    }

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
