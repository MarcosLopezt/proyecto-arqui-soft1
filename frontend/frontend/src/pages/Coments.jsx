import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";

const Comments = () => {
  const [comentarios, setComentarios] = useState([]);
  const [users, setUsers] = useState([]);
  const [showComents, setShowComents] = useState(true);
  const courseID = localStorage.getItem("courseID");

  useEffect(() => {
    if (showComents) {
      getComentarios();
    }
  }, [showComents]);

  const getComentarios = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/coments/${courseID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setComentarios(
          data.map((comentario) => ({
            ...comentario,
            fechaFormateada: formatFecha(comentario.fecha), // Agregar la fecha formateada al objeto comentario
          }))
        );
      } else {
        console.error("Error al obtener comentarios:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const formatFecha = (isoDateString) => {
    const fecha = new Date(isoDateString);

    const opcionesDeFormato = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return fecha.toLocaleDateString("es-ES", opcionesDeFormato);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await Promise.all(
          comentarios.map(async (comentario) => {
            const response = await fetch(
              `http://localhost:8080/users/${comentario.user_id}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.ok) {
              return await response.json();
            } else {
              throw new Error(
                `Error al obtener usuario con ID ${comentario.user_id}`
              );
            }
          })
        );
        setUsers(usersData); // Actualiza el estado con los datos de usuarios obtenidos
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    if (comentarios.length > 0) {
      fetchUsers();
    }
  }, [comentarios]); // Ejecuta cada vez que comentarios cambia

  return (
    <Paper
      sx={{
        padding: "20px",
        marginTop: "20px",
        border: "3px solid #785589",
        marginBottom: "40px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Typography variant="h5" gutterBottom color="#785589">
        Comentarios
      </Typography>
      {comentarios.length === 0 ? (
        <Typography variant="body1">No hay comentarios aún.</Typography>
      ) : (
        comentarios.map((comentario, index) => (
          <div key={index}>
            <Typography
              variant="body1"
              sx={{ fontFamily: "Arial", fontSize: "1.2em" }}
            >
              "{comentario.texto}"
            </Typography>
            <Typography variant="caption">
              Por: {users[index] ? users[index].email : "Usuario desconocido"}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ marginLeft: "60px" }}
            >
              Fecha: {comentario.fechaFormateada}
            </Typography>
            <hr />
          </div>
        ))
      )}
    </Paper>
  );
};

export default Comments;
