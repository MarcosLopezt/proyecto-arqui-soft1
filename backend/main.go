package main

import (
	"backend/router"

	"github.com/gin-gonic/gin"
)

func main() {
	// Creamos una instancia de gin
	engine := gin.Default()

	// Mapeamos las rutas definidas en el router
	router.SetupRouter(engine)

	// Ejecutamos el servidor en el puerto 8080
	err := engine.Run(":8080")
	if err != nil {
		panic(err) // Manejo de errores si el servidor no puede iniciar
	}
}
