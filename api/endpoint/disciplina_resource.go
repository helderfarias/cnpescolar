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
}

func (r *DisciplinaResource) obterTodas(c *gin.Context) {
	context := r.contextFactory.Create(c)

	service := context.GetServiceFactory().GetDisciplinaService()

	criterios := criterio.CriterioDisciplina{
		Pagina: context.GetParamAsInt("pagina"),
		Limite: context.GetParamAsInt("limite"),
	}

	disciplinas, err := service.Consultar(&criterios)
	if err != nil {
		log.Println(err)
	}

	context.Response().
		Header(context.Paginate(criterios.Pagina, criterios.Limite, int64(len(disciplinas)))).
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
