-- +migrate Up

INSERT INTO usuarios (nome, login, senha) VALUES ('Administrador', 'admin', '$2a$10$xbR6Z633eV53LX8CLv8TMusD5T5QDv7aG7Ukg2I9clApaEOzZNCeK');

-- +migrate Down

DELETE FROM usuarios WHERE login = 'admin';