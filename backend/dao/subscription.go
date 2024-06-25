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

func DeleteSubByCourseId(courseId uint) error {
	var subs []subscripciones.Subscription

	if err := db.DB.Where("course_id = ?", courseId).Find(&subs).Error; err != nil {
		return err
	}

	if len(subs) > 0 {
		if err := db.DB.Delete(&subs).Error; err != nil {
            return err
        }
	}

	return nil
}

