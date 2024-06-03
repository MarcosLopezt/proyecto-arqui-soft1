import React from 'react';
import CourseCard from './CourseCard';
import "./CourseCard.css"


  function Courses() {
    return (
      <div className='contenedor-cards'>
        <CourseCard
          title="Análisis Matemático"
          description="Este curso cubre los conceptos básicos del análisis matemático, incluyendo cálculo diferencial e integral."
          image="./imagenes/diseñoUX.jpg"
        />
        <CourseCard
          title="Backend con Go"
          description="Aprende a construir aplicaciones de backend utilizando el lenguaje de programación Go y sus frameworks populares."
        />
        <CourseCard
          title="Frontend con React"
          description="Domina el desarrollo web frontend utilizando React, una de las bibliotecas JavaScript más populares."
        />
        <CourseCard
          title="Diseño UX/UI"
          description="Explora los principios de diseño UX/UI y aprende a crear experiencias de usuario atractivas y efectivas."
        />
      </div>
    );
  }

  export default Courses;