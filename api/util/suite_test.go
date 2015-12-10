package util

import "github.com/stretchr/testify/suite"
import "testing"

type UtilSuite struct {
	suite.Suite
}

func (s *UtilSuite) SetupTest() {
}

func TestUtilAllTests(t *testing.T) {
	suite.Run(t, new(UtilSuite))
}
