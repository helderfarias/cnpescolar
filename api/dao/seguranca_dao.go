package dao

import "github.com/helderfarias/ges/api/lib/orm"
import "github.com/helderfarias/ges/api/dominio"

type SegurancaDAO interface {
	Existe(login, senha string) (*dominio.Usuario, error)
}

type segurancaDAO struct {
	em orm.EntityManager
}

func NewSegurancaDAO(em orm.EntityManager) SegurancaDAO {
	return &segurancaDAO{em: em}
}

func (s *segurancaDAO) Existe(login, senha string) (*dominio.Usuario, error) {
	return &dominio.Usuario{}, nil
}
