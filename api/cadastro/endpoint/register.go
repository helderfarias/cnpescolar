package endpoint

import (
	"github.com/gin-gonic/gin"
	"github.com/helderfarias/ges/api/cadastro/middleware"
)

type Resource interface {
	register(router *gin.Engine)
}

var endpoints []Resource

func init() {
	factory := middleware.NewContextWrapperFactory()

	endpoints = make([]Resource, 0)
	endpoints = append(endpoints, &PingResource{})
	endpoints = append(endpoints, &DisciplinaResource{contextFactory: factory})
}

func RegisterEndpoints(router *gin.Engine) {
	for _, r := range endpoints {
		r.register(router)
	}
}
