package main

import "io/ioutil"
import "log"
import "database/sql"
import "github.com/gin-gonic/gin"
import "github.com/helderfarias/ges/api/endpoint"
import "github.com/helderfarias/ges/api/logger"
import "github.com/helderfarias/ges/api/middleware"
import "github.com/helderfarias/ges/api/util"
import _ "github.com/lib/pq"
import "gopkg.in/yaml.v2"

func main() {
	logger.Info("Lendo configurações de sistema")
	config := carregarConfiguracoes()

	logger.Info("Estabelecendo conexão com banco de dados")
	db, err := sql.Open("postgres", config.Database.Datasource)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	logger.Info("Criando pool de conexões: Min: %d, Max: %d", config.Database.Pool.Min, config.Database.Pool.Max)
	db.Ping()
	db.SetMaxIdleConns(config.Database.Pool.Min)
	db.SetMaxOpenConns(config.Database.Pool.Max)

	logger.Info("Registrando middlewares")
	router := gin.Default()
	router.Use(middleware.CrossOrigin())
	router.Use(middleware.SecurityRest())
	router.Use(middleware.DataBase(db, config.Database.Showsql))

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
