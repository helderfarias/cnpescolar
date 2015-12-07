package criteria

import "github.com/stretchr/testify/suite"
import "testing"

type CriteriaSuite struct {
	suite.Suite
}

func (s *CriteriaSuite) SetupTest() {
}

func TestEndpointAllTests(t *testing.T) {
	suite.Run(t, new(CriteriaSuite))
}
