package middleware

import "github.com/gin-gonic/gin"
import "github.com/helderfarias/ges/api/service"
import "github.com/helderfarias/ges/api/lib/orm"

func ServiceFactory() gin.HandlerFunc {
	return func(c *gin.Context) {
		em := c.MustGet("entityManager").(orm.EntityManager)

		c.Set("serviceFactory", service.NewServiceFactory(em))

		c.Next()
	}
}
