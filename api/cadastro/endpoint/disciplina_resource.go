package endpoint

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/helderfarias/ges/api/cadastro/dominio"
	"github.com/helderfarias/ges/api/cadastro/middleware"
)

type DisciplinaResource struct {
	contextFactory middleware.ContextWrapperFactory
}

func (r *DisciplinaResource) register(router *gin.Engine) {
	grupo := router.Group("/ges/v1/api")

	grupo.GET("/disciplinas", r.listarTodos)
	grupo.POST("/disciplinas", r.cadastrar)
}

func (r *DisciplinaResource) listarTodos(c *gin.Context) {
	contextWrapper := r.contextFactory.Create(c)

	pagina := contextWrapper.GetParamAsInt("pagina")
	limite := contextWrapper.GetParamAsInt("limite")

	var disciplinas []dominio.Disciplina
	disciplinas = append(disciplinas, dominio.Disciplina{Id: 1, Nome: "Matemática"})
	disciplinas = append(disciplinas, dominio.Disciplina{Id: 1, Nome: "Matemática"})
	disciplinas = append(disciplinas, dominio.Disciplina{Id: 1, Nome: "Matemática"})
	disciplinas = append(disciplinas, dominio.Disciplina{Id: 1, Nome: "Matemática"})
	disciplinas = append(disciplinas, dominio.Disciplina{Id: 1, Nome: "Matemática"})
	disciplinas = append(disciplinas, dominio.Disciplina{Id: 1, Nome: "Matemática"})

	contextWrapper.Response().
		Header(contextWrapper.CalcularPaginas(pagina, limite, int64(len(disciplinas)))).
		Status(http.StatusOK).
		Entity(disciplinas)
}

func (r *DisciplinaResource) cadastrar(c *gin.Context) {
	contextWrapper := r.contextFactory.Create(c)

	var disciplina dominio.Disciplina
	if !c.Bind(&disciplina) {
		return
	}

	contextWrapper.Response().Created()
}
