import React from "react";
import CourseCard from "./CourseCard";
import "./CourseCard.css";

function capitalizeTitle(title) {
  return title.replace(/\b\w/g, (char) => char.toUpperCase());
}

function Courses({ courses }) {
  //console.log(courses[0].CourseName);
  console.log("Courses:", courses);
  const modulos = courses.length;
  //const margenEntreTarjetas = `calc(100% / ${modulos})`;

  return (
    <div className="contenedor-cards" style={{ padding: "60px" }}>
      {courses.map((course) => (
        <CourseCard
          key={course.ID}
          title={capitalizeTitle(course.course_name)}
          description={course.description}
          category={course.category}
          length={course.length}
          modulos={modulos}
        />
      ))}
    </div>
  );
}

export default Courses;
