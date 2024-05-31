package users

import (
	"time"
)

type User struct {
	ID           uint   `gorm:"primaryKey"`
	Username     string `gorm:"uniqueIndex"`
	Email        string
	PasswordHash string
	Role         string
	CreationDate time.Time
	LastUpdated  time.Time
}
