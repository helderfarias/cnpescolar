-- +migrate Up

CREATE TABLE usuarios (
  id BIGSERIAL NOT NULL PRIMARY KEY, 
  nome VARCHAR(255) NOT NULL,
  login VARCHAR(255) NOT NULL,
  senha VARCHAR(100) NOT NULL
);

-- +migrate Down

DROP TABLE usuarios;