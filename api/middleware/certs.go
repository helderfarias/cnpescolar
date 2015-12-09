package middleware

import "github.com/gin-gonic/gin"
import "github.com/helderfarias/ges/api/util"

func CertifiedConfig(certs *util.Certified) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set("certs", certs)
		c.Next()
	}
}
