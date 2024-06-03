package dao

import (
	"backend/db"
	"backend/models/cursos"
	//"gorm.io/gorm"
)

func CreateCourse(curso *cursos.Course) error {
	return db.DB.Create(curso).Error
}
