package criterio

import "github.com/stretchr/testify/suite"
import "testing"

type CriterioSuite struct {
	suite.Suite
}

func (s *CriterioSuite) SetupTest() {
}

func TestCriterioAllTests(t *testing.T) {
	suite.Run(t, new(CriterioSuite))
}
