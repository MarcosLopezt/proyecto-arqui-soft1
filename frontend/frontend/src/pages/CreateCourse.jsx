import React, { useState, useEffect } from "react";
import "./Home.css";
import { useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
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
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import "../components/Componentes.css";
import { useFormik } from "formik";
import * as Yup from "yup";
//import { SearchBar } from './SearchBar';
//validar permisos para ver que modulos mostramos en la navbar

function CreateCourse() {
  const location = useLocation();
  const role = location.state?.role;

  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  //const [searchText, setSearchText] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setUserRole(role);
  }, [role]);

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

  // const handleChange = (event) => {
  //   setSearchText(event.target.value);
  // };

  const submit = (values) => {
    search(values.text);
  };

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      text: "",
    },

    validationSchema: Yup.object({
      text: Yup.string()
        .required("¡Campo Requerido!")
        .max(255, "Maximo 255 caracteres"),
    }),

    onSubmit: submit,
  });

  const search = async () => {
    const response = await fetch(`http://localhost:8080/cursos/curso`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      //console.log(data[0]);
      setCourses(data);
      console.log(courses[0]);
    } else {
      console.log("No existe el curso");
    }
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

  const funcOnSubmit = (event) => {
    event.preventDefault();
    //crear curso
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Logo
          </Typography>

          {/* Barra de búsqueda */}
          <div style={{ marginRight: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: "4px",
                paddingLeft: "10px",
              }}
            >
              <SearchIcon />
              <form onSubmit={handleSubmit}>
                <InputBase
                  placeholder="Buscar..."
                  inputProps={{ "aria-label": "buscar" }}
                  style={{ marginLeft: "10px" }}
                  name="text"
                  value={values.text}
                  onChange={handleChange}
                  error={!!errors.text}
                  helperText={errors.text}
                />
              </form>
            </div>
          </div>

          {/* Botón de "Mis Cursos" */}
          <Button className="button-misCursos" variant="contained">
            Mis Cursos
          </Button>

          {/* Botón de "Crear Curso" */}
          {userRole === "admin" && (
            <Button className="button-crear-curso" variant="contained">
              Crear Curso
            </Button>
          )}

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
        <Typography variant="h4" align="center" gutterBottom>
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
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}

export default CreateCourse;
