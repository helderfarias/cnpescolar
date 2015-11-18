package middleware

import (
	"github.com/gin-gonic/gin"
	"strings"
)

func CrossOrigin() gin.HandlerFunc {
	return func(c *gin.Context) {
		if strings.EqualFold("OPTIONS", c.Request.Method) {
			c.Writer.WriteHeader(200)
			c.Writer.Header().Add("Access-Control-Allow-Origin", "*")
			c.Writer.Header().Add("Access-Control-Allow-Headers", "content-type, authorization, accept, x-requested-with")
			c.Writer.Header().Add("Access-Control-Allow-Methods", "get, put, post, delete, options")
			c.Writer.Header().Add("Access-Control-Expose-Headers", "x-total-count, x-limit-count, link")
			c.Next()
			return
		}

        c.Writer.Header().Add("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Add("Access-Control-Allow-Headers", "content-type, authorization, accept, x-requested-with")
        c.Writer.Header().Add("Access-Control-Allow-Methods", "get, put, post, delete, options")
        c.Writer.Header().Add("Access-Control-Expose-Headers", "x-total-count, x-limit-count, link")
		c.Next()
	}
}
