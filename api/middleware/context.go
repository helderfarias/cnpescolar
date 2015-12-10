package middleware

import "github.com/gin-gonic/gin"
import "github.com/helderfarias/ges/api/util"
import "strconv"
import "github.com/helderfarias/ges/api/service"
import "github.com/helderfarias/ges/api/lib/orm"
import "github.com/go-gorp/gorp"

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
	parserForm     bool
	context        *gin.Context
	response       Response
	serviceFactory service.ServiceFactory
}

type contextWrapperFactory struct {
}

func NewContextWrapperFactory() ContextWrapperFactory {
	return &contextWrapperFactory{}
}

func (ctf *contextWrapperFactory) Create(context *gin.Context) ContextWrapper {
	wrapper := &contextWrapper{}
	wrapper.context = context
	wrapper.response = NewResponse(context)
	wrapper.serviceFactory = ctf.createServiceFactory(context)
	return wrapper
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
	return c.serviceFactory
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

func (c *contextWrapperFactory) createServiceFactory(context *gin.Context) service.ServiceFactory {
	var em orm.EntityManager
	var certs *util.Certified

	if tx, ok := context.Get("tx"); ok && tx != nil {
		em = orm.NewEntityManagerWithTransaction(tx.(*gorp.Transaction))
	} else {
		db := context.MustGet("databaseConnection").(*gorp.DbMap)
		em = orm.NewEntityManager(db)
	}

	certs = context.MustGet("certs").(*util.Certified)

	return service.NewServiceFactory(em, certs)
}
