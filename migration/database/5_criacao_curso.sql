-- +migrate Up

CREATE TABLE cursos (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  nivel_id BIGINT NOT NULL
);

-- +migrate Down
DROP TABLE cursos;
