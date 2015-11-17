package main

import (
	"github.com/helderfarias/cnpescolar/api/endpoint"
	"github.com/helderfarias/cnpescolar/api/logger"
	"github.com/helderfarias/cnpescolar/api/util"
	"github.com/helderfarias/cnpescolar/api/middleware"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"log"
)

func main() {
	logger.Info("Lendo configurações de sistema")
	config := carregarConfiguracoes()

	logger.Info("Estabelecendo conexão com banco de dados")
	db := sqlx.MustOpen(config.Database.Dialect, config.Database.Datasource)
	defer db.Close()

	logger.Info("Criando pool de conexões: Min: %d, Max: %d", config.Database.Pool.Min, config.Database.Pool.Max)
	db.Ping()
	db.SetMaxIdleConns(config.Database.Pool.Min)
	db.SetMaxOpenConns(config.Database.Pool.Max)

	logger.Info("Registrando middlewares")
	router := gin.Default()
	router.Use(middleware.CrossOrigin())
	router.Use(middleware.SecurityRest())

	logger.Info("Registrando endpoints")
	endpoint.PingRegister(router)
	router.Run(":4000")
}

func carregarConfiguracoes() *util.ResourceConfig {
	config := env.GetOpt("CONFIG_FILE", "application.yml")

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
