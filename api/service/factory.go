package service

import "github.com/helderfarias/ges/api/dao"
import "github.com/helderfarias/ges/api/lib/orm"
import "github.com/helderfarias/ges/api/util"

type ServiceFactory interface {
	GetDisciplinaService() DisciplinaService
	GetSegurancaService() SegurancaService
}

type serviceFactory struct {
	disciplinaService DisciplinaService
	segurancaService  SegurancaService
}

func NewServiceFactory(em orm.EntityManager, certs *util.Certified) ServiceFactory {
	factory := &serviceFactory{}

	factory.disciplinaService = &disciplinaService{
		dao: dao.NewDisciplinaDAO(em),
	}

	factory.segurancaService = &segurancaService{
		dao:  dao.NewSegurancaDAO(em),
		cert: certs,
	}

	return factory
}

func (s *serviceFactory) GetDisciplinaService() DisciplinaService {
	return s.disciplinaService
}

func (s *serviceFactory) GetSegurancaService() SegurancaService {
	return s.segurancaService
}
