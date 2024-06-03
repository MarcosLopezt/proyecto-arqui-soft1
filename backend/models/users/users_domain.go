package users

import (
	"time"
)

type User struct {
	ID           uint      `gorm:"primaryKey"`
	Email        string    `gorm:"uniqueIndex;not null"`
	PasswordHash string    `gorm:"not null"`
	Role         string    `gorm:"not null"`
	CreationDate time.Time `gorm:"autoCreateTime"`
	LastUpdated  time.Time `gorm:"autoUpdateTime"`
}
