-- +migrate Up

CREATE TABLE disciplinas (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL
);

-- +migrate Down

DROP TABLE disciplinas;
