package endpoint

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func PingRegister(router *gin.Engine) {
	grupo := router.Group(Contexto("v1"))

	grupo.GET("/ping", ping)
}

func ping(c *gin.Context) {
	c.String(http.StatusOK, "pong")
}
