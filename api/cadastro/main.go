package main

import (
	"io/ioutil"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/helderfarias/ges/api/cadastro/endpoint"
	"github.com/helderfarias/ges/api/cadastro/logger"
	"github.com/helderfarias/ges/api/cadastro/middleware"
	"github.com/helderfarias/ges/api/cadastro/util"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"gopkg.in/yaml.v2"
)

func main() {
	logger.Info("Lendo configurações de sistema")
	config := carregarConfiguracoes()

	logger.Info("Estabelecendo conexão com banco de dados")
	dbcon := sqlx.MustOpen(config.Database.Dialect, config.Database.Datasource)
	defer dbcon.Close()

	logger.Info("Criando pool de conexões: Min: %d, Max: %d", config.Database.Pool.Min, config.Database.Pool.Max)
	dbcon.Ping()
	dbcon.SetMaxIdleConns(config.Database.Pool.Min)
	dbcon.SetMaxOpenConns(config.Database.Pool.Max)

	logger.Info("Registrando middlewares")
	router := gin.Default()
	router.Use(middleware.CrossOrigin())
	router.Use(middleware.SecurityRest())
	router.Use(middleware.DataBase(dbcon, config.Database.Showsql))

	logger.Info("Registrando endpoints")
	endpoint.RegisterEndpoints(router)
	router.Run(":4000")
}

func carregarConfiguracoes() *util.ResourceConfig {
	config := util.GetOpt("CONFIG_FILE", "application.yml")

	data, err := ioutil.ReadFile(config)
	if err != nil {
		log.Panicln(err)
	}

	var cfg util.ResourceConfig
	err = yaml.Unmarshal([]byte(data), &cfg)
	if err != nil {
		log.Panicln(err)
	}

	return &cfg
}
