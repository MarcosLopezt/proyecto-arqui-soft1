package cursos

import (
	"backend/dao/course"
	"backend/models/cursos"
	"errors"
	"log"
	"strconv"
)

func CreateCourse(request cursos.CreateCourseRequest) (cursos.CreateCourseResponse, error) {

	curso := &cursos.Course{
		CourseName:  request.CourseName,
		Category:    request.Category,
		Length:      request.Length,
		Description: request.Description,
	}

	if err := course.CreateCourse(curso); err != nil {
		log.Printf("Error creating user: %v", err)
		return cursos.CreateCourseResponse{}, err
	}

	//almacenar request en la base de datos
	return cursos.CreateCourseResponse{
		Message: "Se creo el curso",
	}, nil
}

func GetCourseByName(courseNameReq string) ([]cursos.GetCourseByNameResponse, error) {

	courses, err := course.GetCourseByName(courseNameReq)
	if err != nil {
		return nil, err
	}

	var response []cursos.GetCourseByNameResponse
	for _, course := range courses {
		response = append(response, cursos.GetCourseByNameResponse{
			ID: 		course.ID,
			CourseName:  course.CourseName,
			Description: course.Description,
			Length:      course.Length,
			Category:    course.Category,
		})
	}
	return response, nil
}

func GetCourseByID(id string) (cursos.GetCourseByIDResponse, error) {
	uid, err := strconv.ParseUint(id, 10, 32)
	if err != nil {
		return cursos.GetCourseByIDResponse{}, errors.New("ID inválido")
	}
	curso, err := course.GetCourseByID(uint(uid))
	if err != nil {
		return cursos.GetCourseByIDResponse{}, err
	}

	return cursos.GetCourseByIDResponse{
		ID:    curso.ID,
		CourseName:  curso.CourseName,
		Category: curso.Category,    
		Description: curso.Description,
		Length: curso.Length,
	}, nil
}