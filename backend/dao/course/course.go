package course

import (
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