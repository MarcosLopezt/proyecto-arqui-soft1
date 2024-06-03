package users_service

import (
	"backend/auth"
	"backend/dao"
	"backend/models/users"
	"errors"
	"log"
	"strconv"

	"golang.org/x/crypto/bcrypt"
)

func Login(request users.LoginRequest) (users.LoginResponse, error) {
	user, err := dao.GetUserByEmail(request.Email)
	if err != nil {
		return users.LoginResponse{}, err
	}

	//log.Printf(request.Password)
	//log.Printf(user.PasswordHash)

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(request.Password))
	if err != nil {
		return users.LoginResponse{}, errors.New("credenciales inválidas")
	}
	/*
		if user == nil || user.PasswordHash != request.Password {
			return users.LoginResponse{}, errors.New("credenciales inválidas")
		}
	*/
	token, err := auth.GenerateAuthToken(user.ID)
	if err != nil {
		return users.LoginResponse{}, err
	}

	return users.LoginResponse{Token: token}, nil
}

func CreateUser(request users.CreateUserRequest) (users.UserResponse, error) {
	// Hashing the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(request.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("Error hashing password: %v", err)
		return users.UserResponse{}, err
	}

	user := &users.User{
		Email:        request.Email,
		PasswordHash: string(hashedPassword),
		Role:         request.Role,
	}

	// Try to create the user in the database
	if err := dao.CreateUser(user); err != nil {
		log.Printf("Error creating user: %v", err)
		return users.UserResponse{}, err
	}

	// Successfully created user
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
