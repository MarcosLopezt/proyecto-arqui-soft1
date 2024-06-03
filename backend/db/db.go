package db

import (
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() error {
	// Reemplaza usuario, contraseña, host, puerto y nombre_basedatos con tus propios valores
	DBName := "arq-soft"         //Nombre de la base de datos local de ustedes
	DBUser := "root"             //usuario de la base de datos, habitualmente root
	DBPass := "marcoslopez1719$" //password del root en la instalacion
	DBHost := "127.0.0.1"
	// Conecta a la base de datos
	dsn := DBUser + ":" + DBPass + "@tcp(" + DBHost + ":3306)/" + DBName + "?charset=utf8mb4&parseTime=True&loc=Local"

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Println("Connection Failed to Open")
		log.Fatal(err)
	} else {
		log.Println("Connection Established")
	}
	// Asigna la instancia de la base de datos a la variable DB
	DB = db

	return nil
}
