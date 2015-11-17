package endpoint

import (
	"fmt"
	"github.com/helderfarias/cnpescolar/api/dominio"
	"github.com/gin-gonic/gin"
)

func Contexto(versao string) string {
	return fmt.Sprintf("/cnpescolar/%s/api", versao)
}
