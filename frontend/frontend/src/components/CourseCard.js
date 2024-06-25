import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material"; // Importa los componentes de Material-UI
import "./CourseCard.css"; // Importa el archivo CSS para estilos específicos de la tarjeta
import { useNavigate } from "react-router-dom";

function CourseCard({
  ID,
  title,
  description,
  className,
  image,
  length,
  category,
  modulos,
}) {
  const margenEntreTarjetas = `calc(100% / ${modulos})`;
  const navigate = useNavigate();

  const isTitleLong = title.length > 16 && modulos > 3;

  const infoButtonStyle = {
    paddingTop: isTitleLong ? "0px" : "10px", // Agrega un margen inferior si el título es largo
  };

  const cortarDescripcion =
    description.length > 112 && modulos > 2
      ? `${description.slice(0, 109)}...`
      : description;

  const handleClick = () => {
    localStorage.setItem("courseID", ID);
    localStorage.setItem("cursoTitulo", title);
    localStorage.setItem("cursoDescripcion", description);
    localStorage.setItem("cursoCategoria", category);
    localStorage.setItem("cursoLength", length);
    navigate("/course");
  };

  return (
    <Card
      className="card"
      style={{ width: margenEntreTarjetas }}
      onClick={handleClick}
    >
      <CardMedia component="img" alt="Curso" height="140" image={image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cortarDescripcion}
        </Typography>
      </CardContent>
      <CardActions className="card-actions">
        {/*<Button size="small">Subscribirse</Button>*/}
        <Button size="small" style={infoButtonStyle}>
          Más información
        </Button>
      </CardActions>
    </Card>
  );
}

export default CourseCard;
