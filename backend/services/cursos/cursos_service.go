package cursos

import "backend/domain/cursos"

func createCourse(request cursos.CreateCourseRequest) cursos.CreateCourseResponse {

	//almacenar en la base de datos

	return cursos.CreateCourseResponse{
		Message: "Se creo el curso",
	}

}
