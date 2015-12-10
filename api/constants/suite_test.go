package constants

import "github.com/stretchr/testify/suite"
import "testing"

type ConstantsSuite struct {
	suite.Suite
}

func (s *ConstantsSuite) SetupTest() {
}

func TestConstantsAllTests(t *testing.T) {
	suite.Run(t, new(ConstantsSuite))
}
