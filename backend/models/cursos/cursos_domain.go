package cursos

import (
	"time"
)

type Course struct {
	ID           uint      `gorm:"primaryKey"`
	CourseName   string    `gorm:"not null"`
	Category     string    `gorm:"not null"`
	Length       int       `json:"length"`
	Description  string    `gorm:"not null"`
	CreationDate time.Time `gorm:"autoCreateTime"`
	LastUpdated  time.Time `gorm:"autoUpdateTime"`
}
