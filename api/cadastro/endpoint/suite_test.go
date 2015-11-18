package endpoint

import (
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/suite"
	"testing"
)

func init() {
	gin.SetMode(gin.TestMode)
}

type EndpointSuite struct {
	suite.Suite
}

func (s *EndpointSuite) SetupTest() {
}

func TestEndpointAllTests(t *testing.T) {
	suite.Run(t, new(EndpointSuite))
}
