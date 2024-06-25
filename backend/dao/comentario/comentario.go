package comentario

import (
	"backend/db"
	"backend/models/comentarios"
	"errors"
)

func CreateComent(coment *comentarios.Comentario) error {
	return db.DB.Create(coment).Error
}

func GetComentByCourse(id int)([]comentarios.Comentario, error) {
	var coments []comentarios.Comentario

	if err:= db.DB.Where("curso_id = ?", id).Find(&coments).Error; err != nil {
		return nil, err
	}

	if len(coments) == 0 {
        return nil, errors.New("no hay comentarios en este curso")
    }

	return coments, nil
}

//func GetComentByCourse ()