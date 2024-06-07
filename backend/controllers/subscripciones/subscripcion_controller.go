package subscripciones

import (
	subsDomain "backend/models/subscripciones"
	subsService "backend/services/subscripcion_service"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateSubs(c *gin.Context) {
	var createSubsRequest subsDomain.CreateSubsRequest

	if err := c.ShouldBindJSON(&createSubsRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//log.Printf("Inicio creacion1")

	sub, err := subsService.CreateSubs(createSubsRequest)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, sub)
}

func GetSubByUserId(c *gin.Context){
	userId := c.Param("user_id")

	subs, err := subsService.GetSubByUserId(userId)
	if err != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, subs)
}

