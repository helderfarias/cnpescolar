package endpoint

import "net/http"
import "github.com/gin-gonic/gin"
import "github.com/helderfarias/ges/api/dominio"
import "github.com/helderfarias/ges/api/dominio/criterio"
import "github.com/helderfarias/ges/api/middleware"
import "log"

type TurmaResource struct {
	contextFactory middleware.ContextWrapperFactory
}

func (r *TurmaResource) register(router *gin.Engine) {
	grupo := router.Group("/ges/v1/api")

	grupo.GET("/turmas", r.obterTodas)
	grupo.POST("/turmas", r.cadastrar)
	grupo.PUT("/turmas/:id", r.alterar)
	grupo.DELETE("/turmas/:id", r.excluir)
}

func (r *TurmaResource) obterTodas(c *gin.Context) {
	context := r.contextFactory.Create(c)

	service := context.GetServiceFactory().GetTurmaService()

	criterios := criterio.CriterioTurma{
		Nome:   context.GetQueryParam("nome"),
		Pagina: context.GetQueryParamAsInt("pagina"),
		Limite: context.GetQueryParamAsInt("limite"),
	}

	turmas, total, err := service.Consultar(&criterios)
	if err != nil {
		log.Println(err)
	}

	context.Response().
		Header(context.Paginate(criterios.Pagina, criterios.Limite, total)).
		Status(http.StatusOK).
		Entity(turmas)
}

func (r *TurmaResource) cadastrar(c *gin.Context) {
	var curso dominio.Turma

    context := r.contextFactory.Create(c)

	context.Bind(&curso)

	service := context.GetServiceFactory().GetTurmaService()

	service.Cadastrar(&curso)

	context.Response().Created()
}

func (r *TurmaResource) alterar(c *gin.Context) {
    var curso dominio.Turma

	context := r.contextFactory.Create(c)

	context.Bind(&curso)

	curso.Id = context.GetParamAsInt64("id")

	service := context.GetServiceFactory().GetTurmaService()

	service.Alterar(&curso)

	context.Response().NoContent()
}

func (r *TurmaResource) excluir(c *gin.Context) {
	context := r.contextFactory.Create(c)

	service := context.GetServiceFactory().GetTurmaService()

	service.Excluir(context.GetParamAsInt64("id"))

	context.Response().NoContent()
}
