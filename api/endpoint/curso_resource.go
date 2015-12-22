package endpoint

import "net/http"
import "github.com/gin-gonic/gin"
import "github.com/helderfarias/ges/api/dominio"
import "github.com/helderfarias/ges/api/dominio/criterio"
import "github.com/helderfarias/ges/api/middleware"
import "log"

type CursoResource struct {
	contextFactory middleware.ContextWrapperFactory
}

func (r *CursoResource) register(router *gin.Engine) {
	grupo := router.Group("/ges/v1/api")

	grupo.GET("/cursos", r.obterTodas)
	grupo.POST("/cursos", r.cadastrar)
	grupo.PUT("/cursos/:id", r.alterar)
	grupo.DELETE("/cursos/:id", r.excluir)
}

func (r *CursoResource) obterTodas(c *gin.Context) {
	context := r.contextFactory.Create(c)

	service := context.GetServiceFactory().GetCursoService()

	criterios := criterio.CriterioCurso{
		Nome:   context.GetQueryParam("nome"),
		Pagina: context.GetQueryParamAsInt("pagina"),
		Limite: context.GetQueryParamAsInt("limite"),
	}

	cursos, total, err := service.Consultar(&criterios)
	if err != nil {
		log.Println(err)
	}

	context.Response().
		Header(context.Paginate(criterios.Pagina, criterios.Limite, total)).
		Status(http.StatusOK).
		Entity(cursos)
}

func (r *CursoResource) cadastrar(c *gin.Context) {
	var curso dominio.Curso

    context := r.contextFactory.Create(c)

	context.Bind(&curso)

	service := context.GetServiceFactory().GetCursoService()

	service.Cadastrar(&curso)

	context.Response().Created()
}

func (r *CursoResource) alterar(c *gin.Context) {
    var curso dominio.Curso

	context := r.contextFactory.Create(c)

	context.Bind(&curso)

	curso.Id = context.GetParamAsInt64("id")

	service := context.GetServiceFactory().GetCursoService()

	service.Alterar(&curso)

	context.Response().NoContent()
}

func (r *CursoResource) excluir(c *gin.Context) {
	context := r.contextFactory.Create(c)

	service := context.GetServiceFactory().GetCursoService()

	service.Excluir(context.GetParamAsInt64("id"))

	context.Response().NoContent()
}
