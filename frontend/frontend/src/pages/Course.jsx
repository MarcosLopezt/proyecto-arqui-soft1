import React, { useState, useEffect } from "react";
import "./Home.css";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar,
  Menu,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Container,
  Grid,
  Paper,
  Snackbar,
  Alert,
  InputBase,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import Comments from "./Coments";

import "../components/Componentes.css";

function Course() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const courseID = parseInt(localStorage.getItem("courseID"), 10);
  const titulo = localStorage.getItem("cursoTitulo");
  const descripcion = localStorage.getItem("cursoDescripcion");
  const categoria = localStorage.getItem("cursoCategoria");
  const length = localStorage.getItem("cursoLength");
  const [open, setOpen] = useState(false);
  const [subscripto, setSubscripto] = useState(false);
  const [snackSubscribed, setSnackSubscribed] = useState(false);
  const userRole = localStorage.getItem("userRole");
  const [comentarioText, setComentarioText] = useState("");
  const userID = localStorage.getItem("userID");
  const [snackComent, setSnackComent] = useState(false);
  const [comentErr, setComentErr] = useState(false);

  const handleLogoutClick = () => {
    setLogoutOpen(true);
  };

  const handleLogoutClose = () => {
    setLogoutOpen(false);
  };

  const logout = () => {
    document.cookie =
      "session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    navigate("/");
  };

  const handleSubscription = async () => {
    const userID = parseInt(localStorage.getItem("userID"), 10);
    //console.log(userID);
    //console.log(courseID);

    const response = await fetch(`http://localhost:8080/subscriptions/sub`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userID, course_id: courseID }),
    });

    if (response.status === 201) {
      const data = await response.json();
      console.log(data);
      setOpen(true);
      setSubscripto(true);
    } else {
      console.log("Error en la subscripcion");
    }
  };

  const handleDeleteButton = async () => {
    const response = await fetch(`http://localhost:8080/cursos/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ID: courseID }),
    });

    console.log(response);

    if (response.status === 201) {
      const data = await response.json();
      console.log(data);
      navigate("/home");
    } else {
      console.log("Error al borrar");
    }
  };

  useEffect(() => {
    if (!subscripto) {
      isSubscribed();
    }
  }, [subscripto]);

  const isSubscribed = async () => {
    const userID = parseInt(localStorage.getItem("userID"), 10);
    const response = await fetch(
      `http://localhost:8080/subscriptions/get/${userID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const cursos = await response.json();
      const cursoEncontrado = cursos.find(
        (curso) => courseID === curso.course_id
      );
      if (cursoEncontrado) {
        setSubscripto(true);
      }
    } else {
      console.log("No esta suscripto a ningun curso");
    }
  };

  const handleComment = async () => {
    const userintID = parseInt(userID);

    if (comentarioText === "") {
      setComentErr(true);
      return;
    }
    const response = await fetch(`http://localhost:8080/coments/coment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userintID,
        curso_id: courseID,
        texto: comentarioText,
      }),
    });

    console.log(response);

    if (response.status === 201) {
      //const data = await response.json();
      setSnackComent(true);
    } else {
      console.log("Error al comentar");
    }
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setSnackSubscribed(false);
    setSnackComent(false);
    setComentErr(false);
  };

  const handleMisCursosButton = () => {
    navigate("/mycourses");
  };

  const handleSubscribed = () => {
    setSnackSubscribed(true);
  };

  const handleUpdateButton = () => {
    navigate("/update");
  };

  return (
    <>
      <AppBar
        className="navbar"
        position="static"
        sx={{ backgroundColor: "#785589" }}
      >
        <Toolbar>
          {/* Logo */}
          <Button
            onClick={() => navigate("/home")}
            className="logo-button"
            sx={{
              color: "inherit",
              textTransform: "none",
            }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Logo
            </Typography>
          </Button>

          <div style={{ flexGrow: 1 }}></div>

          {/* Botón de "Mis Cursos" */}
          <Button
            className="button-misCursos"
            variant="contained"
            onClick={handleMisCursosButton}
          >
            Mis Cursos
          </Button>

          {/* Icono de perfil */}
          <IconButton id="profile-icon" onClick={handleLogoutClick}>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </IconButton>

          {/* Menú de logout */}
          <Menu
            anchorEl={
              logoutOpen ? document.getElementById("profile-icon") : null
            }
            open={logoutOpen}
            onClose={handleLogoutClose}
          >
            <div className="list-conteiner">
              <List>
                <ListItemButton onClick={logout} className="button-logout">
                  <ListItemIcon>
                    <LogoutIcon className="icon-logout" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </List>
            </div>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
        <Paper
          sx={{
            padding: "20px",
            border: "3px solid #785589",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Typography variant="h4" gutterBottom>
            {titulo}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">Categoría: {categoria}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                Duracion: {length} semanas
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body1" sx={{ marginTop: "20px" }}>
            Descripción:
          </Typography>
          <Typography
            variant="body2"
            sx={{ whiteSpace: "pre-line", marginTop: "10px" }}
          >
            {descripcion}
          </Typography>
          <Button
            variant="contained"
            className="button-subscribe"
            onClick={subscripto ? handleSubscribed : handleSubscription}
            sx={{ marginTop: "20px", backgroundColor: "rgb(49, 45, 45)" }}
          >
            {subscripto ? "Inscripto" : "Inscribirme ahora"}
          </Button>

          {userRole === "admin" && (
            <>
              <Button
                className="button-editar-curso"
                variant="contained"
                onClick={handleUpdateButton}
              >
                Editar Curso
              </Button>

              <Button
                className="button-editar-curso"
                variant="contained"
                onClick={handleDeleteButton}
              >
                Eliminar Curso
              </Button>
            </>
          )}
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{
                width: "100%",
                fontSize: "1.2em",
                padding: "20px",
                maxWidth: "600px",
              }}
            >
              Subscripción realizada con éxito
            </Alert>
          </Snackbar>
          <Snackbar
            open={snackSubscribed}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{
                width: "100%",
                fontSize: "1.2em",
                padding: "20px",
                maxWidth: "600px",
              }}
            >
              ¡Ya estás subscripto!
            </Alert>
          </Snackbar>
          <Snackbar
            open={snackComent}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{
                width: "100%",
                fontSize: "1.2em",
                padding: "20px",
                maxWidth: "600px",
              }}
            >
              Comentario realizado con exito!
            </Alert>
          </Snackbar>
          <Snackbar
            open={comentErr}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{
                width: "100%",
                fontSize: "1.2em",
                padding: "20px",
                maxWidth: "600px",
              }}
            >
              ¡No se aceptan comentarios vacios!
            </Alert>
          </Snackbar>
        </Paper>
        <Grid container spacing={2} alignItems="center">
          {/* Formulario para agregar comentario */}
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                padding: "10px",
                backgroundColor: "#f0f0f0",
                borderRadius: 1,
                marginTop: "20px",
                border: "3px solid #785589",
              }}
            >
              <Typography variant="h5" gutterBottom>
                {" "}
                Dejanos tu opinion del curso:
              </Typography>
              <InputBase
                fullWidth
                placeholder="Agregar comentario"
                sx={{ paddingLeft: 2 }}
                inputProps={{
                  "aria-label": "agregar comentario",
                  value: comentarioText,
                  onChange: (e) => setComentarioText(e.target.value),
                }}
              />
              <Button
                variant="contained"
                className="button-comentar"
                value
                sx={{ marginLeft: 2, marginTop: 2 }}
                onClick={handleComment}
              >
                Enviar
              </Button>
            </Paper>
          </Grid>

          {/* Sección de comentarios */}
          <Grid item xs={12}>
            <Comments />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Course;
