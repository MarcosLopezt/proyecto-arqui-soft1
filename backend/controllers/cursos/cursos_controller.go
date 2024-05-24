package cursos

import (
	cursosDomain "backend/models/cursos"
	//"Context"
	//cursosServices "backend/services/cursos"
	"github.com/gin-gonic/gin"
)

//funcion para iniciar base de datos

func GetCourses(context *gin.Context) {
	var courseRequest cursosDomain.CreateCourseRequest

	//buscar los cursos base de datos

	context.BindJSON(&courseRequest)

}

func CreateCourse(context *gin.Context) {
	var courseRequest cursosDomain.CreateCourseRequest
	context.BindJSON(&courseRequest)
	//response := cursosServices.createCourse(courseRequest)
	context.JSON(201, "Se creo el curso")
}
