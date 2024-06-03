package middleware

import (
	"backend/auth"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// AuthMiddleware verifica la validez del token
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := c.Cookie("session_token")
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "No se proporcionó el token"})
			c.Abort()
			return
		}

		// Verifica la validez del token
		claims, err := auth.VerifyAuthToken(token)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido"})
			c.Abort()
			return
		}

		// Convierte ExpiresAt a UNIX y compara con el tiempo actual
		if claims.ExpiresAt.Time.Unix() < time.Now().Unix() {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token expirado"})
			c.Abort()
			return
		}

		c.Set("userID", claims.UserID)
		c.Next()
	}
}
