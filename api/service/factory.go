package service

import "github.com/helderfarias/ges/api/dao"
import "github.com/helderfarias/ges/api/lib/orm"

type ServiceFactory interface {
	GetDisciplinaService() DisciplinaService
}

type serviceFactory struct {
	disciplinaService DisciplinaService
}

func NewServiceFactory(em orm.EntityManager) ServiceFactory {
	factory := &serviceFactory{}

	factory.disciplinaService = &disciplinaService{
		dao: dao.NewDisciplinaDAO(em),
	}

	return factory
}

func (s *serviceFactory) GetDisciplinaService() DisciplinaService {
	return s.disciplinaService
}
