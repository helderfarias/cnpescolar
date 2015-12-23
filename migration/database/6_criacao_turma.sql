-- +migrate Up

CREATE TABLE turmas (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  curso_id BIGINT NOT NULL
);

ALTER TABLE turmas ADD CONSTRAINT turmas_cursos FOREIGN KEY (curso_id) REFERENCES cursos (id);

-- +migrate Down
DROP TABLE turmas;
