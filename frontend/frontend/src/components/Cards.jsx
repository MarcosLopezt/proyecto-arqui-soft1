import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, CardMedia } from '@mui/material';

function CourseCard({ title, description }) {
    return (
      <Card sx={{ maxWidth: 345, margin:"20px", marginTop:"60px", borderWidth: "5px" ,borderColor:"#785589" }}>
        <CardMedia
          component="img"
          alt="Curso"
          height="140"
          image="/static/images/cards/course.jpg" // Ruta de la imagen del curso
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Compartir</Button>
          <Button size="small">Más información</Button>
        </CardActions>
      </Card>
    );
  }

  function Courses() {
    return (
      <div className='contenedor-cards'>
        <CourseCard
          title="Análisis Matemático"
          description="Este curso cubre los conceptos básicos del análisis matemático, incluyendo cálculo diferencial e integral."
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