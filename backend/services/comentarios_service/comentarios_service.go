package comentarios_service

import (
	"backend/dao/comentario"
	"backend/models/comentarios"
	"log"
)

func CreateComent(request comentarios.CreateComentRequest) (comentarios.CreateComentResponse, error) {

	coment := &comentarios.Comentario{
		UserId:			 request.UserID,
		CursoId:        request.CursoID,
		Texto: request.Texto,
	}

	if err := comentario.CreateComent(coment); err != nil {
		log.Printf("Error creating coment: %v", err)
		return comentarios.CreateComentResponse{}, err
	}


	return comentarios.CreateComentResponse{
		Message: "Comentario realizado con exito!",
	}, nil
}

func GetComentByCourse(id int)([]comentarios.GetComentByCourseResp, error){
	coments, err := comentario.GetComentByCourse(id)
	if err != nil {
		return nil, err
	}

	var response []comentarios.GetComentByCourseResp 
	for _, coment := range coments {
		response = append(response, comentarios.GetComentByCourseResp{
			CursoID:  coment.CursoId,
			UserID: coment.UserId,
			Texto:    coment.Texto,
			Fecha: coment.Fecha,
		})
	}
	return response, nil
}
