package logger

import "github.com/stretchr/testify/suite"
import "testing"

type LoggerSuite struct {
	suite.Suite
}

func (s *LoggerSuite) SetupTest() {
}

func TestLoggerAllTests(t *testing.T) {
	suite.Run(t, new(LoggerSuite))
}
