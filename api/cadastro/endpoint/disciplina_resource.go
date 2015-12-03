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
	context := r.contextFactory.Create(c)

	pagina := context.GetParamAsInt("pagina")
	limite := context.GetParamAsInt("limite")

	var disciplinas []dominio.Disciplina
	disciplinas = append(disciplinas, dominio.Disciplina{Id: 1, Nome: "Matemática"})
	disciplinas = append(disciplinas, dominio.Disciplina{Id: 2, Nome: "Português"})
	disciplinas = append(disciplinas, dominio.Disciplina{Id: 3, Nome: "Ciência"})
	disciplinas = append(disciplinas, dominio.Disciplina{Id: 4, Nome: "Inglês"})
	disciplinas = append(disciplinas, dominio.Disciplina{Id: 5, Nome: "Biologia"})
	disciplinas = append(disciplinas, dominio.Disciplina{Id: 6, Nome: "Sociologia"})

	context.Response().
		Header(context.CalcularPaginas(pagina, limite, int64(len(disciplinas)))).
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
