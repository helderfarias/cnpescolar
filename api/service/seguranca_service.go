package service

import "github.com/helderfarias/ges/api/dominio"
import "github.com/helderfarias/ges/api/dao"

// import "github.com/helderfarias/ges/api/logger"
import "github.com/helderfarias/ges/api/lib/orm"

// import "github.com/dgrijalva/jwt-go"

// import "crypto/ecdsa"
// import "errors"

type SegurancaService interface {
	Autenticar(login, senha string) (*dominio.Token, error)
}

type segurancaService struct {
	dao dao.SegurancaDAO
}

func NewSegurancaService(em orm.EntityManager) SegurancaService {
	return &segurancaService{
		dao: dao.NewSegurancaDAO(em),
	}
}

func (d *segurancaService) Autenticar(login, senha string) (*dominio.Token, error) {
	// if login == "" || senha == "" {
	// 	return nil, errors.New("Credências não informada")
	// }

	// usuario, _ := d.dao.Existe(login, senha)
	// if usuario == nil {
	// 	return nil, errors.New("Credências inválida")
	// }

	// var err error
	// var ecdsaKey *ecdsa.PrivateKey
	// if ecdsaKey, err = jwt.ParseECPrivateKeyFromPEM(s.gateway.GetPrivateKey()); err != nil {
	// 	logger.Error("Erro ao tentar efetuar parser chave private", err)
	// 	return nil, errors.New("Não foi possível validar token")
	// }

	// signMethod := jwt.New(jwt.SigningMethodES512)
	// signMethod.Claims["login"] = usuario.CpfCnpj
	// signMethod.Claims["roles"] = dominio.ROLES_EASYMOBILE

	// var token string
	// token, err = signMethod.SignedString(ecdsaKey)
	// if err != nil {
	// 	logger.Error("Erro ao tentar assinar token", err)
	// 	return nil, errors.New("Token inválido")
	// }

	return &dominio.Token{}, nil
}
