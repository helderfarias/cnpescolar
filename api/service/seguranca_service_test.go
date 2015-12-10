package service

func (t *ServiceSuite) TestCriarInstanciaSegurancaService() {
	service := NewSegurancaService(t.entityManagerMock, t.certs)

	t.NotNil(service)
}

func (t *ServiceSuite) TestDeveriaGerarTokenValido() {
	service := &segurancaService{dao: t.usuarioDAOMock, cert: t.certs}

	token, err := service.Autenticar("login", "senha")

	t.NotNil(service)
	t.NotNil(token)
	t.Nil(err)
}
