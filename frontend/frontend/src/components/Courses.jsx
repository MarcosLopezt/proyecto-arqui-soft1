import React from "react";
import CourseCard from "./CourseCard";
import "./CourseCard.css";

function capitalizeTitle(title) {
  return title.replace(/\b\w/g, (char) => char.toUpperCase());
}

function Courses({ courses }) {
  //console.log("Courses:", courses);
  const modulos = courses.length;
  const shouldWrap = modulos > 4;
  //const margenEntreTarjetas = `calc(100% / ${modulos})`;
  if (modulos === 0) {
    return null;
  }

  return (
    <div
      className={`contenedor-cards ${shouldWrap ? "wrap" : ""}`}
      style={{ padding: "60px" }}
    >
      {courses.map((course) => (
        <CourseCard
          key={course.ID}
          ID={course.ID}
          title={capitalizeTitle(course.course_name)}
          description={course.description}
          category={course.category}
          length={course.length}
          modulos={modulos}
          image={`/assets/skillup${Math.floor(Math.random() * 6) + 2}.jpg`}
        />
      ))}
    </div>
  );
}

export default Courses;
