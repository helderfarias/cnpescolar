package endpoint

import "net/http"
import "github.com/gin-gonic/gin"
import "github.com/helderfarias/ges/api/middleware"
import oauthhttp "github.com/helderfarias/oauthprovider-go/http"

type TokenResource struct {
	contextFactory middleware.ContextWrapperFactory
}

func (r *TokenResource) register(router *gin.Engine) {
	grupo := router.Group("/ges/v1/api")

	grupo.POST("/token", r.emitirToken)
}

func (r *TokenResource) emitirToken(c *gin.Context) {
	context := r.contextFactory.Create(c)

	service := context.GetServiceFactory().GetSegurancaService()

	request := oauthhttp.OAuthRequest{HttpRequest: c.Request}

	token, err := service.Autenticar(request.GetUserName(), request.GetPassword())
	if err != nil {
		context.Response().Error(http.StatusUnauthorized, "Credênciais Inválida")
		return
	}

	context.Response().Status(http.StatusOK).Entity(token)
}
