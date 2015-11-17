package endpoint

import (
	"fmt"
	"github.com/helderfarias/ges/api/dominio"
	"github.com/gin-gonic/gin"
)

func Contexto(versao string) string {
	return fmt.Sprintf("/ges/%s/api", versao)
}
