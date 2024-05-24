package users

import "backend/models/users"

func Login(request users.LoginRequest) users.LoginResponse {
	// Validar contra la base de datos

	return users.LoginResponse{
		Token: "abcdef123456",
	}
}
