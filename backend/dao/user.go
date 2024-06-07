package dao

import (
	"backend/db"
	"backend/models/users"
	"errors"

	"gorm.io/gorm"
)

//crear nuevo usuario en db

func CreateUser(user *users.User) error {
    return db.DB.Create(user).Error
}

//traer todos los users

func GetAllUsers() ([]users.User, error) {
    var users []users.User
    if err := db.DB.Find(&users).Error; err != nil {
        return nil, err
    }
    return users, nil
}

//traer user por id

func GetUserByID(id uint) (*users.User, error) {
    var user users.User
    if err := db.DB.First(&user, id).Error; err != nil {
        return nil, err
    }
    return &user, nil
}

func GetUserByEmail(email string) (*users.User, error) {
    var user users.User
    if err := db.DB.Where("email = ?", email).First(&user).Error; err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            // No se encontró ningún usuario con el nombre de usuario proporcionado
            return nil, nil
        }
        // Otro error al consultar la base de datos
        return nil, err
    }
    return &user, nil
}