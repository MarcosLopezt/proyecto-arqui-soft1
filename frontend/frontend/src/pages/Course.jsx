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
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import UpdateCourse from './UpdateCourse';

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
    console.log(userID);
    console.log(courseID);

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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setSnackSubscribed(false);
  };

  const handleMisCursosButton = () => {
    navigate("/mycourses");
  };

  const handleSubscribed = () => {
    setSnackSubscribed(true);
  };

  const handleUpdateButton = async () => {
    //endpoint para editar curso
    navigate("/update", {
      state: {
          courseID,
          titulo,
          descripcion,
          categoria,
          length
      }
  })

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
        <Paper sx={{ padding: "20px", border: "3px solid #785589" }}>
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
            <Button
              className="button-crear-curso"
              variant="contained"
              onClick={handleUpdateButton}
            >
              Editar Curso
            </Button>
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
              severity="error" // Cambiado a "error" para color rojo
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
        </Paper>
      </Container>
    </>
  );
}

export default Course;
