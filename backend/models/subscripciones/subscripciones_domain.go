package subscripciones

import (
	"time"
)

type Subscription struct {
	ID           uint      	`gorm:"primaryKey"`
	UserID       uint    	`gorm:"not null"`
	CourseID 	uint    	`gorm:"not null"`
	CreationDate time.Time 	`gorm:"autoCreateTime"`
	LastUpdated  time.Time 	`gorm:"autoUpdateTime"`
}
