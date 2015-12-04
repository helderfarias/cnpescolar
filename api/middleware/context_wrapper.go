package middleware

import "github.com/gin-gonic/gin"
import "github.com/helderfarias/ges/api/util"
import "strconv"
import "github.com/helderfarias/ges/api/service"

type ContextWrapperFactory interface {
	Create(context *gin.Context) ContextWrapper
}

type ContextWrapper interface {
	Response() Response
	GetParam(name string) string
	GetParamAsInt(name string) int
	Paginate(pagina int, limite int, total int64) Params
	GetServiceFactory() service.ServiceFactory
}

type contextWrapper struct {
	parserForm bool
	context    *gin.Context
	response   Response
}

type contextWrapperFactory struct {
}

func NewContextWrapperFactory() ContextWrapperFactory {
	return &contextWrapperFactory{}
}

func (ctf *contextWrapperFactory) Create(context *gin.Context) ContextWrapper {
	return &contextWrapper{
		context:  context,
		response: NewResponse(context),
	}
}

func (c *contextWrapper) Response() Response {
	return c.response
}

func (c *contextWrapper) GetParam(name string) string {
	c.prepareParams()

	return c.context.Request.Form.Get(name)
}

func (c *contextWrapper) GetParamAsInt(name string) int {
	value := c.GetParam(name)

	if value == "" {
		return 0
	}

	return util.ToInteger(value)
}

func (c *contextWrapper) GetServiceFactory() service.ServiceFactory {
	return c.context.MustGet("serviceFactory").(service.ServiceFactory)
}

func (c *contextWrapper) Paginate(pagina int, limite int, total int64) Params {
	if limite <= 0 {
		return Params{}
	}

	return Params{
		"X-Total-Count": strconv.FormatInt(total, 10),
		"X-Limit-Count": strconv.FormatInt(int64(limite), 10),
	}
}

func (c *contextWrapper) prepareParams() {
	if !c.parserForm {
		c.context.Request.ParseForm()
		c.parserForm = true
	}
}
