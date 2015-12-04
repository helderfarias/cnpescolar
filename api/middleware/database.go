package middleware

import (
	"database/sql"
	"github.com/gin-gonic/gin"
	"github.com/go-gorp/gorp"
	"github.com/helderfarias/ges/api/dominio"
	"github.com/helderfarias/ges/api/lib/orm"
)

func DataBase(db *sql.DB, debug bool) gin.HandlerFunc {
	dbmap := &gorp.DbMap{Db: db, Dialect: gorp.PostgresDialect{}}

	dbmap.AddTableWithName(dominio.Disciplina{}, "disciplinas").SetKeys(true, "Id")

	return func(c *gin.Context) {
		c.Set("entityManager", orm.NewEntityManager(dbmap))
		c.Next()
	}
}
