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
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import "../components/Componentes.css";

function UpdateCourse() {
  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const location = useLocation();
  const { courseID, titulo, descripcion, categoria, length } = location.state;

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
    course_name: titulo || "",
    category: categoria || "",
    description: descripcion || "",
    length: length || "",
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

    const response = await fetch(`http://localhost:8080/cursos/update/${courseID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...curso, length: lengthInt }),
    });

    if (response.ok) {
      console.log("Curso actualizado exitosamente.");
    } else {
      console.error("Error al actualizar el curso:", response.statusText);
    }
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
                Actualizar Curso
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}

export default UpdateCourse;
