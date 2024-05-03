package cursos

import (
	cursosDomain "backend/domain/cursos"
	//cursosServices "backend/services/cursos"
	//"context"
	"github.com/gin-gonic/gin"
)

func CreateCourse(context *gin.Context) {
	var courseRequest cursosDomain.CreateCourseRequest
	context.BindJSON(&courseRequest)
	//response := cursosServices.createCourse(courseRequest)
	context.JSON(201, "Se creo el curso")
}
