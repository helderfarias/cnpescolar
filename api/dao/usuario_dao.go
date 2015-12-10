package dao

import "github.com/helderfarias/ges/api/lib/orm"
import "github.com/helderfarias/ges/api/dominio"
import "github.com/helderfarias/ges/api/util"
import "errors"

const (
	SQL_BUSCAR_USUARIO_POR_LOGIN = `SELECT nome, senha 
 	                                  FROM usuarios 
 	                                 WHERE login = :login`
)

type UsuarioDAO interface {
	Existe(login, senha string) (*dominio.Usuario, error)
}

type usuarioDAO struct {
	em orm.EntityManager
}

func NewUsuarioDAO(em orm.EntityManager) UsuarioDAO {
	return &usuarioDAO{em: em}
}

func (s *usuarioDAO) Existe(login, senha string) (*dominio.Usuario, error) {
	var usuario dominio.Usuario

	err := s.em.Get(&usuario, SQL_BUSCAR_USUARIO_POR_LOGIN, map[string]interface{}{"login": login})
	if err != nil {
		return nil, err
	}

	if !util.ComparePassword(senha, usuario.Senha) {
		return nil, errors.New("Credências não confere")
	}

	return &usuario, err
}
