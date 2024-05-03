package users

import (
	//"context"
	usersDomain "backend/domain/users"
	usersService "backend/services/users"

	"github.com/gin-gonic/gin"
)

func Login(context *gin.Context) {
	var LoginRequest usersDomain.LoginRequest
	context.BindJSON(&LoginRequest)
	response := usersService.Login(LoginRequest)
	context.JSON(200, response)
}
