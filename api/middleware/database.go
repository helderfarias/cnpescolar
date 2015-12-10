package middleware

import "database/sql"
import "github.com/gin-gonic/gin"
import "github.com/go-gorp/gorp"
import "github.com/helderfarias/ges/api/dominio"

func DataBase(db *sql.DB, debug bool) gin.HandlerFunc {
	dbmap := &gorp.DbMap{Db: db, Dialect: gorp.PostgresDialect{}}

	dbmap.AddTableWithName(dominio.Disciplina{}, "disciplinas").SetKeys(true, "Id")

	return func(c *gin.Context) {
		c.Set("databaseConnection", dbmap)
		c.Next()
	}
}
