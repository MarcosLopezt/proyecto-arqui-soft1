import React, { useState } from "react";
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
  Grid,
  Container,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import "../components/Componentes.css";

function CreateCourse() {
  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [open, setOpen] = useState(false);

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

  const [curso, setCurso] = useState({
    course_name: "",
    category: "",
    description: "",
    length: "",
  });

  const funcOnChange = (event) => {
    const { name, value } = event.target;
    setCurso((prevCurso) => ({
      ...prevCurso,
      [name]: value,
    }));
  };

  const funcOnSubmit = async (event) => {
    event.preventDefault();
    const lengthInt = parseInt(curso.length, 10);

    const response = await fetch("http://localhost:8080/cursos/curso", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...curso, length: lengthInt }),
    });

    if (response.ok) {
      setOpen(true);
      console.log("Curso creado exitosamente.");
    } else {
      console.error("Error al crear el curso:", response.statusText);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
          <Button className="button-misCursos" variant="contained">
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
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" marginTop="30px" gutterBottom>
          Crear Nuevo Curso
        </Typography>
        <form onSubmit={funcOnSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Nombre del Curso"
                name="course_name"
                value={curso.course_name}
                onChange={funcOnChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Categoría"
                name="category"
                value={curso.category}
                onChange={funcOnChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                name="description"
                value={curso.description}
                onChange={funcOnChange}
                fullWidth
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Duración (en semanas)"
                name="length"
                type="number"
                value={curso.length}
                onChange={funcOnChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Crear Curso
              </Button>

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
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}

export default CreateCourse;
