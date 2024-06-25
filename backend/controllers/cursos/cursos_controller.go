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

func GetCourseByName(c *gin.Context) {
	//var getCourseRequest cursosDomain.GetCourseByNameRequest
	name := c.Param("course_name")

	course, err := cursosService.GetCourseByName(name)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, course)
}

func GetCourseByID(c *gin.Context) {
	id := c.Param("id")
	course, err := cursosService.GetCourseByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, course)
}

func UpdateCourse(c *gin.Context) {
    var updateCourseRequest cursosDomain.UpdateCourseRequest
    if err := c.ShouldBindJSON(&updateCourseRequest); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    course, err := cursosService.UpdateCourse(updateCourseRequest)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, course)
}

func DeleteCourse(c *gin.Context) {
	//id := c.Param("id")
    var deleteCourseRequest cursosDomain.DeleteCourseRequest
    if err := c.ShouldBindJSON(&deleteCourseRequest); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    course, err := cursosService.DeleteCourse(deleteCourseRequest)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, course)
}