package service

import "github.com/helderfarias/ges/api/dominio"
import "github.com/helderfarias/ges/api/dao"
import "github.com/helderfarias/ges/api/util"
import "github.com/helderfarias/ges/api/logger"
import "github.com/helderfarias/ges/api/constants"
import "github.com/helderfarias/ges/api/lib/orm"
import "github.com/dgrijalva/jwt-go"
import "crypto/ecdsa"
import "errors"

type SegurancaService interface {
	Autenticar(login, senha string) (*dominio.Token, error)
}

type segurancaService struct {
	dao  dao.UsuarioDAO
	cert *util.Certified
}

func NewSegurancaService(em orm.EntityManager, certs *util.Certified) SegurancaService {
	return &segurancaService{
		dao:  dao.NewUsuarioDAO(em),
		cert: certs,
	}
}

func (d *segurancaService) Autenticar(login, senha string) (*dominio.Token, error) {
	if login == "" || senha == "" {
		return nil, errors.New("Credências não informada")
	}

	usuario, err := d.dao.Existe(login, senha)
	if usuario == nil {
		logger.Error("Erro ao tentar buscar usuario para autênticação - %s", err)
		return nil, errors.New("Credências inválida")
	}

	var ecdsaKey *ecdsa.PrivateKey
	if ecdsaKey, err = jwt.ParseECPrivateKeyFromPEM(d.cert.PrivateKey); err != nil {
		logger.Error("Erro ao tentar efetuar parser chave private - %s", err)
		return nil, errors.New("Não foi possível validar token")
	}

	signMethod := jwt.New(jwt.SigningMethodES512)
	signMethod.Claims["login"] = login
	signMethod.Claims["roles"] = constants.ROLE_PERMISSAO_ACESSO_SISTEMA

	var token string
	token, err = signMethod.SignedString(ecdsaKey)
	if err != nil {
		logger.Error("Erro ao tentar assinar token - %s", err)
		return nil, errors.New("Token inválido")
	}

	return &dominio.Token{token}, err
}
