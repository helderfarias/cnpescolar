package dominio

import "encoding/base64"
import "encoding/json"
import "log"
import "strings"

type Token struct {
	Token string `json:"token"`
}

type payload struct {
	Nome  string `json:"nome"`
	Login string `json:"login"`
	Roles string `json:"roles"`
}

func (t *Token) GetUsuario() *Usuario {
	parts := strings.Split(t.Token, ".")

	data, err := base64.StdEncoding.DecodeString(parts[1])
	if err != nil {
		log.Println(err)
		return nil
	}

	var pd payload
	err = json.Unmarshal(data, &pd)
	if err != nil {
		log.Println(err)
		return nil
	}

	return &Usuario{
		Login:      pd.Login,
		Nome:       pd.Nome,
		Permissoes: strings.Split(pd.Roles, ","),
	}
}
