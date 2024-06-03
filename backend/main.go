package main

import (
	"backend/db"
	"backend/router"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Creamos una instancia de gin
	err := db.Connect()
	if err != nil {
		log.Fatalf("Error al conectar con la base de datos: %v", err)
	}

	engine := gin.Default()

	// Configuracion del middleware CORS
	engine.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // Permitir solicitudes de cualquier origen
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Mapeamos las rutas definidas en el router
	router.SetupRouter(engine)

	// Ejecutamos el servidor en el puerto 8080
	err = engine.Run(":8080")
	if err != nil {
		panic(err) // Manejo de errores si el servidor no puede iniciar
	}
}
