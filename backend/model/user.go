package model

type Usuario struct {
	Id       int    `gorm:"primaryKey"`
	Nombre   string `gorm:"type:varchar(100);not null"`
	Apellido string `gorm:"type:varchar(100);not null"`
	Email    string `gorm:"type:varchar(100);unique;not null"`
	Password string `gorm:"type:varchar(100);not null"`
	Rol      string `gorm:"type:varchar(50);not null"`
}

type Usuarios []Usuario
