package router

import (
	"backend/controllers/cursos"
	"backend/controllers/users"

	"github.com/gin-gonic/gin"
)

func MapUrls(engine *gin.Engine) {
	engine.POST("/users/login", users.Login)
	engine.POST("/cursos/create", cursos.CreateCourse)
}
