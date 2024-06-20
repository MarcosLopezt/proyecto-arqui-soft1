package comentarios

import (
	"time"
)

type Comentario struct {
	ID           uint   `json:"ID" gorm:"primaryKey"`
	CursoId      int    `json:"curso_id" gorm:"not null"`
	UserId       int    `json:"user_id" gorm:"not null"`
	Texto        string       `json:"texto"`
	Fecha        time.Time `gorm:"autoCreateTime"`
}
