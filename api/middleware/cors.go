package middleware

import "strings"
import "github.com/gin-gonic/gin"

func CrossOrigin() gin.HandlerFunc {
	return func(c *gin.Context) {
		if strings.EqualFold("OPTIONS", c.Request.Method) {
			c.Writer.WriteHeader(200)
			c.Writer.Header().Add("Access-Control-Allow-Origin", "*")
			c.Writer.Header().Add("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, X-Requested-With")
			c.Writer.Header().Add("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
			c.Writer.Header().Add("Access-Control-Expose-Headers", "X-Total-Count, X-Limit-Count")
			c.Next()
			return
		}

		c.Writer.Header().Add("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Add("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, X-Requested-With")
		c.Writer.Header().Add("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
		c.Writer.Header().Add("Access-Control-Expose-Headers", "X-Total-Count, X-Limit-Count")
		c.Next()
	}
}
