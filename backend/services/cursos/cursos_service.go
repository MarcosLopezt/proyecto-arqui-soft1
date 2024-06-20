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


func UpdateCourse(request cursos.UpdateCourseRequest) (cursos.UpdateCourseResponse, error) {
    stringid := strconv.FormatUint(uint64(request.ID), 10)
    curso, err := GetCourseByID(stringid)
    if err != nil {
        log.Printf("Error fetching course: %v", err)
        return cursos.UpdateCourseResponse{}, err
    }

    // Actualizar los campos del curso
    curso.CourseName = request.CourseName
    curso.Category = request.Category
    curso.Length = request.Length
    curso.Description = request.Description

    cursoNuevo, err := course.UpdateCourse(request)
    // Guardar los cambios en la base de datos
    if err != nil {
        log.Printf("Error updating course: %v", err)
        return cursos.UpdateCourseResponse{}, err
    }

    return cursos.UpdateCourseResponse{
        ID:          cursoNuevo.ID,
        CourseName:  cursoNuevo.CourseName,
        Category:    cursoNuevo.Category,
        Description: cursoNuevo.Description,
        Length:      cursoNuevo.Length,
    }, nil
}

func DeleteCourse(request cursos.DeleteCourseRequest) (cursos.DeleteCourseResponse, error){
	
	curso, err := course.DeleteCourse(request)

	if err != nil {
		return cursos.DeleteCourseResponse{}, err
	}

	return cursos.DeleteCourseResponse{
		Message: curso.Message,
	}, nil
}