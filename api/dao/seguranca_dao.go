package dao

import "github.com/helderfarias/ges/api/lib/orm"
import "github.com/helderfarias/ges/api/dominio"
import "github.com/helderfarias/ges/api/util"
import "errors"

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
	var usuario dominio.Usuario

	err := s.em.Get(&usuario,
		"SELECT id, nome, senha FROM usuarios WHERE nome = :nome",
		map[string]interface{}{
			"nome": login,
		})

	if err != nil {
		return nil, err
	}

	if !util.ComparePassword(senha, usuario.Senha) {
		return nil, errors.New("Credências não confere")
	}

	return &usuario, err
}
