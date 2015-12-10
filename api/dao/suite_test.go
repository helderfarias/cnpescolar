package dao

import "github.com/stretchr/testify/suite"
import "testing"

type DaoSuite struct {
	suite.Suite
}

func (s *DaoSuite) SetupTest() {
}

func TestDaoAllTests(t *testing.T) {
	suite.Run(t, new(DaoSuite))
}
