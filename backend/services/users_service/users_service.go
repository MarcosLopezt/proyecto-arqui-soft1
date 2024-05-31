package users_service

import (
	"backend/auth"
	"backend/dao"
	"backend/models/users"
	"errors"
	"strconv"
)

func Login(request users.LoginRequest) (users.LoginResponse, error) {
	user, err := dao.GetUserByUsername(request.Username)
	if err != nil {
		return users.LoginResponse{}, err
	}

	if user == nil || user.PasswordHash != request.Password {
		return users.LoginResponse{}, errors.New("credenciales inválidas")
	}

	token, err := auth.GenerateAuthToken(user.ID)
	if err != nil {
		return users.LoginResponse{}, err
	}

	return users.LoginResponse{Token: token}, nil
}

func CreateUser(request users.CreateUserRequest) (users.UserResponse, error) {
	user := &users.User{
		Email:        request.Email,
		PasswordHash: request.Password, // Aquí deberías hashear la contraseña
		Role:         request.Role,
	}

	if err := dao.CreateUser(user); err != nil {
		return users.UserResponse{}, err
	}

	return users.UserResponse{
		ID:    user.ID,
		Email: user.Email,
		Role:  user.Role,
	}, nil
}

func GetUserByID(id string) (users.UserResponse, error) {
	uid, err := strconv.ParseUint(id, 10, 32)
	if err != nil {
		return users.UserResponse{}, errors.New("ID inválido")
	}
	user, err := dao.GetUserByID(uint(uid))
	if err != nil {
		return users.UserResponse{}, err
	}

	return users.UserResponse{
		ID:    user.ID,
		Email: user.Email,
		Role:  user.Role,
	}, nil
}

/*

func GetAllUsers() ([]users.UserResponse, error) {
	users, err := dao.GetAllUsers()
	if err != nil {
		return nil, err
	}

	var userResponses []users.UserResponse
	for _, user := range users {
		userResponses = append(userResponses, users.UserResponse{
			ID:    user.ID,
			Email: user.Email,
			Role:  user.Role,
		})
	}

	return userResponses, nil
}
*/
