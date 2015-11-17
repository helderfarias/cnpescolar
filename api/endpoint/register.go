package endpoint

import "github.com/gin-gonic/gin"

type Resource interface {
	register(router *gin.Engine)
}

var endpoints []Resource

func init() {
	endpoints = make([]Resource, 0)
	endpoints = append(endpoints, &PingResource{})
	endpoints = append(endpoints, &DisciplinaResource{})
}

func RegisterEndpoints(router *gin.Engine) {
	for _, r := range endpoints {
		r.register(router)
	}
}
