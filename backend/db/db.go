package db

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() error {
	// Configura la conexión a la base de datos MySQL
	dsn := "usuario:contraseña@tcp(host:puerto)/nombre_basedatos?charset=utf8mb4&parseTime=True&loc=Local"
	// Reemplaza usuario, contraseña, host, puerto y nombre_basedatos con tus propios valores

	// Conecta a la base de datos
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return err
	}

	// Asigna la instancia de la base de datos a la variable DB
	DB = db

	return nil
}
