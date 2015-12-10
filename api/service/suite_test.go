package service

import "github.com/helderfarias/ges/api/lib/orm"
import "github.com/helderfarias/ges/api/util"
import "github.com/stretchr/testify/suite"
import "testing"

type ServiceSuite struct {
	suite.Suite
	entityManagerMock orm.EntityManager
	certs             *util.Certified
	usuarioDAOMock    *usuarioDAOMock
}

func (s *ServiceSuite) SetupTest() {
	s.entityManagerMock = &entityManagerMock{}
	s.certs = &util.Certified{}
	s.usuarioDAOMock = &usuarioDAOMock{}
}

func TestServiceAllTests(t *testing.T) {
	suite.Run(t, new(ServiceSuite))
}
