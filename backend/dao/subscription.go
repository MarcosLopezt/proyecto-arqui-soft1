package dao

import (
	"backend/db"
	"backend/models/subscripciones"
	"errors"
)

func CreateSubs(sub *subscripciones.Subscription) error {
	return db.DB.Create(sub).Error
}

func GetSubByUserId(userId uint) ([]subscripciones.Subscription,error){
	var subs []subscripciones.Subscription
	if err:= db.DB.Where("user_id = ?", userId).Find(&subs).Error; err != nil {
		return nil, err
	}

	if len(subs) == 0 {
        return nil, errors.New("no subscriptions found for the given user ID")
    }

	return subs, nil
}

