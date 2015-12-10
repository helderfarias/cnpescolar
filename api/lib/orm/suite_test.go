package orm

import "github.com/stretchr/testify/suite"
import "testing"

type OrmSuite struct {
	suite.Suite
}

func (s *OrmSuite) SetupTest() {
}

func TestOrmAllTests(t *testing.T) {
	suite.Run(t, new(OrmSuite))
}
