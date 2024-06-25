package comentarios

import (
	comentsDomain "backend/models/comentarios"
	comentsService "backend/services/comentarios_service"

	//"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CreateComent(c *gin.Context) {
	var createComentRequest comentsDomain.CreateComentRequest

	if err := c.ShouldBindJSON(&createComentRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//log.Printf("Inicio creacion1")

	coment, err := comentsService.CreateComent(createComentRequest)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, coment)
}

func GetComentsByCourse(c *gin.Context){
	id := c.Param("id")
	intID, err := strconv.Atoi(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID inválido"})
		return
	}
	
	coment, err := comentsService.GetComentByCourse(intID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, coment)
}