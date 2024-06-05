package cursos

type CreateCourseRequest struct {
	CourseName  string `json:"course_name"`
	Category    string `json:"category"`
	Description string `json:"description"`
	Length      int    `json:"length"`
}

type CreateCourseResponse struct {
	Message string `json:"message"`
}

type GetCourseByNameRequest struct {
	CourseName string `json:"course_name"`
}

type GetCourseByNameResponse struct {
	ID          uint   `json:"ID"`
	CourseName  string `json:"course_name"`
	Category    string `json:"category"`
	Description string `json:"description"`
	Length      int    `json:"length"`
}
