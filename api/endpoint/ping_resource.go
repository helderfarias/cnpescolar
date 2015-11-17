package endpoint

import "net/http"
import "github.com/gin-gonic/gin"

type PingResource struct {
}

func (r *PingResource) register(router *gin.Engine) {
	grupo := router.Group("/ges/v1/api")

	grupo.GET("/ping", r.ping)
}

func (r *PingResource) ping(c *gin.Context) {
	c.String(http.StatusOK, "pong")
}
