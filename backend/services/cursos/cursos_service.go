package cursos

import (
	"backend/dao"
	"backend/models/cursos"
	"log"
)

func CreateCourse(request cursos.CreateCourseRequest) (cursos.CreateCourseResponse, error) {

	curso := &cursos.Course{
		CourseName:  request.CourseName,
		Category:    request.Category,
		Length:      request.Length,
		Description: request.Description,
	}

	if err := dao.CreateCourse(curso); err != nil {
		log.Printf("Error creating user: %v", err)
		return cursos.CreateCourseResponse{}, err
	}

	//almacenar request en la base de datos
	return cursos.CreateCourseResponse{
		Message: "Se creo el curso",
	}, nil
}
