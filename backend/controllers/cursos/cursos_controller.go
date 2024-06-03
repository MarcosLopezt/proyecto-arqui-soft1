package cursos

import (
	cursosDomain "backend/models/cursos"
	cursosService "backend/services/cursos"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateCourse(c *gin.Context) {
	var createCourseRequest cursosDomain.CreateCourseRequest
	if err := c.ShouldBindJSON(&createCourseRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	course, err := cursosService.CreateCourse(createCourseRequest)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, course)
}
