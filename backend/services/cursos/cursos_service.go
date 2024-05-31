package cursos

import (
	"backend/models/cursos"
)

/*
func RegisterRoutes() *gin.Engine {

	router := gin.Default()

	//configuramos la base de datos con gorm y sqlite

	db, err := gorm.Open(sqlite.Open("coursed.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&cursos.Course{})

}
*/
func createCourse(request cursos.CreateCourseRequest) cursos.CreateCourseResponse {

	//almacenar request en la base de datos
	return cursos.CreateCourseResponse{
		Message: "Se creo el curso",
	}
}
