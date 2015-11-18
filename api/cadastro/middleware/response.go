package middleware

import "net/http"
import "github.com/gin-gonic/gin"

type ResponseBuild struct {
	ctx *gin.Context
}

type EntityBuild struct {
	status int
	build  *ResponseBuild
}

type HeaderBuild struct {
	build *ResponseBuild
}

type Params map[string]string

func Response(c *gin.Context) *ResponseBuild {
	return &ResponseBuild{ctx: c}
}

func (r *ResponseBuild) Ok(value string) {
	r.ctx.Data(http.StatusOK, "application/json", []byte(value))
}

func (r *ResponseBuild) Created() {
	r.ctx.JSON(http.StatusCreated, gin.H{})
}

func (r *ResponseBuild) NoContent() {
	r.ctx.Writer.WriteHeader(http.StatusNoContent)
}

func (r *ResponseBuild) Status(code int) *EntityBuild {
	return &EntityBuild{status: code, build: r}
}

func (e *HeaderBuild) Status(code int) *EntityBuild {
	return &EntityBuild{status: code, build: e.build}
}

func (r *ResponseBuild) Header(headers Params) *HeaderBuild {
	for key, value := range headers {
		r.ctx.Writer.Header().Add(key, value)
	}
	return &HeaderBuild{build: r}
}

func (e *EntityBuild) Entity(value interface{}) {
	e.build.ctx.JSON(e.status, value)
}
