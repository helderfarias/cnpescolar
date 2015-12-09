package service

import "github.com/helderfarias/ges/api/dao"
import "github.com/helderfarias/ges/api/lib/orm"

type ServiceFactory interface {
	GetDisciplinaService() DisciplinaService
	GetSegurancaService() SegurancaService
}

type serviceFactory struct {
	disciplinaService DisciplinaService
	segurancaService  SegurancaService
}

func NewServiceFactory(em orm.EntityManager) ServiceFactory {
	factory := &serviceFactory{}

	factory.disciplinaService = &disciplinaService{
		dao: dao.NewDisciplinaDAO(em),
	}

	factory.segurancaService = &segurancaService{
		dao: dao.NewSegurancaDAO(em),
	}

	return factory
}

func (s *serviceFactory) GetDisciplinaService() DisciplinaService {
	return s.disciplinaService
}

func (s *serviceFactory) GetSegurancaService() SegurancaService {
	return s.segurancaService
}
