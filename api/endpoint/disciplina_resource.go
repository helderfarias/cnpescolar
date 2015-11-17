package endpoint

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/helderfarias/ges/api/dominio"
	"github.com/helderfarias/ges/api/middleware"
)

type DisciplinaResource struct {
}

func (r *DisciplinaResource) register(router *gin.Engine) {
	grupo := router.Group("/ges/v1/api")

	grupo.GET("/disciplinas", r.listarTodos)
}

func (r *DisciplinaResource) listarTodos(c *gin.Context) {
	disciplinas := []dominio.Disciplina{
		dominio.Disciplina{Nome: "Inglês"},
		dominio.Disciplina{Nome: "Matemática"},
		dominio.Disciplina{Nome: "Fisíca"},
	}

	middleware.Response(c).Status(http.StatusOK).Entity(disciplinas)
}
