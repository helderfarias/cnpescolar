package middleware

import "github.com/stretchr/testify/suite"
import "testing"

type MiddlewareSuite struct {
	suite.Suite
}

func (s *MiddlewareSuite) SetupTest() {
}

func TestServiceAllTests(t *testing.T) {
	suite.Run(t, new(MiddlewareSuite))
}
