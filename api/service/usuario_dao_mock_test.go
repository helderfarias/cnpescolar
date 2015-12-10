package service

import "github.com/helderfarias/ges/api/dominio"

type usuarioDAOMock struct {
}

func (u *usuarioDAOMock) Existe(login, senha string) (*dominio.Usuario, error) {
	return nil, nil
}
