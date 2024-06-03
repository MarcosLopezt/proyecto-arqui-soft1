
import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material'; // Importa los componentes de Material-UI
import './CourseCard.css'; // Importa el archivo CSS para estilos específicos de la tarjeta

function CourseCard({ title, description, className, image }) {
  return (
    <Card className='card' >
      <CardMedia
        component="img"
        alt="Curso"
        height="140"
        image={image} 
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

export default CourseCard;
