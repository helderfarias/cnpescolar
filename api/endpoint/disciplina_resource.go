package endpoint

import "net/http"
import "github.com/gin-gonic/gin"
import "github.com/helderfarias/ges/api/dominio"
import "github.com/helderfarias/ges/api/dominio/criterio"
import "github.com/helderfarias/ges/api/middleware"
import "log"

type DisciplinaResource struct {
	contextFactory middleware.ContextWrapperFactory
}

func (r *DisciplinaResource) register(router *gin.Engine) {
	grupo := router.Group("/ges/v1/api")

	grupo.GET("/disciplinas", r.obterTodas)
	grupo.POST("/disciplinas", r.cadastrar)
	grupo.PUT("/disciplinas/:id", r.alterar)
}

func (r *DisciplinaResource) obterTodas(c *gin.Context) {
	context := r.contextFactory.Create(c)

	service := context.GetServiceFactory().GetDisciplinaService()

	criterios := criterio.CriterioDisciplina{
		Nome:   context.GetQueryParam("nome"),
		Pagina: context.GetQueryParamAsInt("pagina"),
		Limite: context.GetQueryParamAsInt("limite"),
	}

	disciplinas, total, err := service.Consultar(&criterios)
	if err != nil {
		log.Println(err)
	}

	log.Println(criterios)

	context.Response().
		Header(context.Paginate(criterios.Pagina, criterios.Limite, total)).
		Status(http.StatusOK).
		Entity(disciplinas)
}

func (r *DisciplinaResource) cadastrar(c *gin.Context) {
	var disciplina dominio.Disciplina

	if err := c.Bind(&disciplina); err != nil {
		log.Println(err)
		return
	}

	context := r.contextFactory.Create(c)

	service := context.GetServiceFactory().GetDisciplinaService()

	service.Cadastrar(&disciplina)

	context.Response().Created()
}

func (r *DisciplinaResource) alterar(c *gin.Context) {
	context := r.contextFactory.Create(c)

	var disciplina dominio.Disciplina
	
	context.Bind(&disciplina)

	disciplina.Id = context.GetParamAsInt64("id")

	service := context.GetServiceFactory().GetDisciplinaService()

	service.Alterar(&disciplina)

	context.Response().NoContent()
}
