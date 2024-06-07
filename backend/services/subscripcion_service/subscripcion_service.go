package subscripcion_service

import (
	"backend/dao"
	"backend/models/subscripciones"
	"errors"
	"log"
	"strconv"
)

func CreateSubs(request subscripciones.CreateSubsRequest) (subscripciones.CreateSubsResponse, error) {

	sub := &subscripciones.Subscription{
		UserID:			 request.UserID,
		CourseID:        request.CourseID,
	}

	// Try to create the user in the database
	if err := dao.CreateSubs(sub); err != nil {
		log.Printf("Error creating sub: %v", err)
		return subscripciones.CreateSubsResponse{}, err
	}

	// Successfully created user
	return subscripciones.CreateSubsResponse{
		Message: "Subscripcion realizada con exito!",
	}, nil
}

func GetSubByUserId(id string) ([]subscripciones.GetSubByUserResponse, error){
	uid, err := strconv.ParseUint(id, 10, 32)
	if err != nil{
		return []subscripciones.GetSubByUserResponse{}, errors.New("ID invalido")
	}

	subs, err := dao.GetSubByUserId(uint(uid))
	if err != nil {
		return []subscripciones.GetSubByUserResponse{}, err
	}

	var response []subscripciones.GetSubByUserResponse
    for _, sub := range subs {
        response = append(response, subscripciones.GetSubByUserResponse{
            ID:       sub.ID,
            UserID:   sub.UserID,
            CourseID: sub.CourseID,
        })
    }

	return response, nil
}

