package cursos

type CreateCourseRequest struct {
	CourseName  string `json:"course_name "`
	Category    string `json:"category "`
	Description string `json:"description "`
}

type CreateCourseResponse struct {
	Message string `json:"message "`
}
