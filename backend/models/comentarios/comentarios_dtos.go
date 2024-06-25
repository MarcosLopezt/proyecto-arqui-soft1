package comentarios

import (
	"time"
)

type CreateComentRequest struct {
	UserID  int    `json:"user_id"`
	CursoID int    `json:"curso_id"`
	Texto   string `json:"texto"`
}

type CreateComentResponse struct {
	Message string `json:"message"`
}

type GetComentByCourseReq struct {
	CursoID int `json:"curso_id"`
}

type GetComentByCourseResp struct {
	UserID  int    `json:"user_id"`
	CursoID int    `json:"curso_id"`
	Texto   string `json:"texto"`
	Fecha  time.Time `json:"fecha"`
}