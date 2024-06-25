package router

import (
	"backend/controllers/comentarios"
	"backend/controllers/cursos"
	"backend/controllers/subscripciones"
	"backend/controllers/users"

	"github.com/gin-gonic/gin"
)

func SetupRouter(r *gin.Engine) *gin.Engine {
	// Grupo de rutas para usuarios
	userRoutes := r.Group("/users")
	{
		userRoutes.POST("/login", users.LoginHandler)
		userRoutes.POST("/register", users.CreateUser)
		userRoutes.GET("/:id", users.GetUserByID)
	}

	// Grupo de rutas para cursos
	courseRoutes := r.Group("/cursos")
	{
		//courseRoutes.Use(middleware.AuthMiddleware())
		courseRoutes.POST("/curso", cursos.CreateCourse)
		courseRoutes.GET("/:course_name", cursos.GetCourseByName)
		courseRoutes.GET("/get/:id", cursos.GetCourseByID)
		courseRoutes.PUT("/update", cursos.UpdateCourse)		
		courseRoutes.DELETE("/delete", cursos.DeleteCourse)
	}

	subsRoutes := r.Group("/subscriptions")
	{
		subsRoutes.POST("/sub", subscripciones.CreateSubs)
		subsRoutes.GET("/get/:user_id", subscripciones.GetSubByUserId)
	}

	comentRoutes := r.Group("/coments")
	{
		comentRoutes.POST("/coment", comentarios.CreateComent)
		comentRoutes.GET("/:id", comentarios.GetComentsByCourse)
	}

	return r
}
