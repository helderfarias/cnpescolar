package service

import "github.com/stretchr/testify/suite"
import "testing"

type ServiceSuite struct {
	suite.Suite
}

func (s *ServiceSuite) SetupTest() {
}

func TestServiceAllTests(t *testing.T) {
	suite.Run(t, new(ServiceSuite))
}
