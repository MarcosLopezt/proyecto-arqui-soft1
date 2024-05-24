package model

type Curso struct {
	Id                int     `gorm:"primaryKey"`
	Titulo            string  `gorm:"type:varchar(200);not null"`
	Descripcion       string  `gorm:"type:text;not null"`
	InstructorId      int     `gorm:"not null"`
	Categoria         string  `gorm:"type:varchar(100);not null"`
	Calificacion      float64 `gorm:"default:0"`
	NumeroEstudiantes int     `gorm:"default:0"`
}

type Cursos []Curso
