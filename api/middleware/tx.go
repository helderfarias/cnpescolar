package middleware

import "github.com/gin-gonic/gin"
import "github.com/go-gorp/gorp"

func Transaction() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if r := recover(); r != nil {
				if value, ok := c.Get("tx"); ok && value != nil {
					tx := value.(*gorp.Transaction)
					tx.Rollback()
				}
				panic(r)
			}
		}()

		db := c.MustGet("databaseConnection").(*gorp.DbMap)

		tx, err := db.Begin()
		if err != nil {
			panic(err)
		}

		c.Set("tx", tx)

		c.Next()

		if len(c.Errors) == 0 {
			tx.Commit()
		} else {
			tx.Rollback()
		}
	}
}
