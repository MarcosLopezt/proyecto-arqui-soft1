package router

import (
	"backend/controllers/cursos"
	"backend/controllers/users"

	"github.com/gin-gonic/gin"
)

func SetupRouter(r *gin.Engine) *gin.Engine {
	// Grupo de rutas para usuarios
	userRoutes := r.Group("/users")
	{
		userRoutes.POST("/login", users.Login)
		userRoutes.POST("/register", users.CreateUser)
		userRoutes.GET("/:id", users.GetUserByID)
	}

	// Grupo de rutas para cursos
	courseRoutes := r.Group("/cursos")
	{
		courseRoutes.POST("/curso", cursos.CreateCourse)
	}

	return r
}
