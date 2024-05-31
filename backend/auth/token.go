package auth

import (
	"time"

	"github.com/golang-jwt/jwt/v4"
)

var jwtSecret = []byte("tu_secreto_aqui")

func GenerateAuthToken(userID uint) (string, error) {
	// Define el contenido del token
	claims := jwt.MapClaims{
		"userID": userID,
		"exp":    time.Now().Add(time.Hour * 24).Unix(), // El token expira en 24 horas
	}

	// Crea un nuevo token JWT con los claims y firma con la clave secreta
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString(jwtSecret)
	if err != nil {
		return "", err
	}

	return signedToken, nil
}
