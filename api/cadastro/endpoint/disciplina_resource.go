package endpoint

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/helderfarias/ges/api/cadastro/dominio"
	"github.com/helderfarias/ges/api/cadastro/middleware"
)

type DisciplinaResource struct {
	disciplinas []dominio.Disciplina
}

func (r *DisciplinaResource) register(router *gin.Engine) {
	r.disciplinas = make([]dominio.Disciplina, 0)

	grupo := router.Group("/ges/v1/api")

	grupo.GET("/disciplinas", r.listarTodos)
	grupo.POST("/disciplinas", r.cadastrar)
}

func (r *DisciplinaResource) listarTodos(c *gin.Context) {
	middleware.Response(c).Status(http.StatusOK).Entity(r.disciplinas)
}

func (r *DisciplinaResource) cadastrar(c *gin.Context) {
	var disciplina dominio.Disciplina
	if !c.Bind(&disciplina) {
		return
	}

	r.disciplinas = append(r.disciplinas, disciplina)

	middleware.Response(c).Status(http.StatusOK).Entity(r.disciplinas)
}
