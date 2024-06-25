package course

import (
	"backend/dao"
	"backend/db"
	"backend/models/cursos"
	"errors"

	"gorm.io/gorm"
)

func CreateCourse(curso *cursos.Course) error {
	return db.DB.Create(curso).Error
}

func GetCourseByName(courseName string) ([]cursos.Course, error) {
	var courses []cursos.Course

	if err := db.DB.Where("course_name LIKE ? OR category LIKE ?", "%"+courseName+"%", "%"+courseName+"%").Find(&courses).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// No se encontró ningún curso con ese nombre
			return nil, nil
		}
		// Otro error al consultar la base de datos
		return nil, err
	}

	return courses, nil
}


func GetCourseByID(id uint) (*cursos.Course, error) {
    var course cursos.Course
    if err := db.DB.First(&course, id).Error; err != nil {
        return nil, err
    }
    return &course, nil
}

func UpdateCourse(request cursos.UpdateCourseRequest) (*cursos.UpdateCourseResponse, error) {
    var oldCourse cursos.Course
    if err := db.DB.First(&oldCourse, request.ID).Error; err != nil {
        return nil, err
    }

    oldCourse.CourseName = request.CourseName
    oldCourse.Category = request.Category
    oldCourse.Description = request.Description
    oldCourse.Length = request.Length
    oldCourse.LastUpdated = request.LastUpdated

    if err := db.DB.Save(&oldCourse).Error; err != nil {
        return nil, err
    }

    response := &cursos.UpdateCourseResponse{
        ID:          oldCourse.ID,
        CourseName:  oldCourse.CourseName,
        Category:    oldCourse.Category,
        Description: oldCourse.Description,
        Length:      oldCourse.Length,
    }
    return response, nil

}

func DeleteCourse(request cursos.DeleteCourseRequest)(*cursos.DeleteCourseResponse, error){
    var curso cursos.Course
    
    if  err:= dao.DeleteSubByCourseId(request.ID); err != nil {
        return  nil, err
    }

    if err := db.DB.First(&curso, request.ID).Error; err != nil {
        return nil, err
    }

    if err := db.DB.Delete(&curso).Error; err != nil {
        return nil, err
    }

    response := &cursos.DeleteCourseResponse{
        Message: "Se elmino el curso de manera exitosa",
    }

    return response, nil
}