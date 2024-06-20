import React, { useState, useEffect } from "react";
import "./Home.css";
import Courses from "../components/Courses";
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
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import "../components/Componentes.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { isAuthenticated } from "../utils/authUtils";

function Home() {
  //const location = useLocation();
  const userRole = localStorage.getItem("userRole");

  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);
  //const [userRole, setUserRole] = useState(role);
  const [courses, setCourses] = useState([]);
  const [recomendados, setRecomendados] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // useEffect(() => {
  //   setUserRole(role);
  // }, [role]);

  useEffect(() => {
    if (recomendados) {
      searchRecommended();
    }
  }, [recomendados]);

  useEffect(() => {
    setAuthenticated(isAuthenticated);
    if (authenticated) {
      logout();
    }
  }, []);

  const handleLogoutClick = () => {
    setLogoutOpen(true);
  };

  const handleLogoutClose = () => {
    setLogoutOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const searchRecommended = async () => {
    const name = "informatica"; //cursos recomendados a buscar
    const response = await fetch(`http://localhost:8080/cursos/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      setCourses(data);
      //console.log(courses[0]);
    } else {
      console.log("No existe el curso");
      setSnackbarMessage("No existen cursos con ese nombre o categoría.");
      setSnackbarOpen(true);
    }
  };

  const submit = (values) => {
    if (!values.text.trim()) {
      setRecomendados(true);
      searchRecommended(); //muestra cursos recomendado (por defecto de informatica)
    } else {
      setRecomendados(false);
      search(values.text);
    }
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

  const search = async (name) => {
    const response = await fetch(`http://localhost:8080/cursos/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const cursos = await response.json();
      if (cursos === null) {
        setSnackbarMessage("No existen cursos con ese nombre o categoría.");
        setSnackbarOpen(true);
      }
      setCourses(cursos);
    } else {
      console.log("no encontre cursos");
      setSnackbarMessage("No existen cursos con ese nombre o categoría.");
      setSnackbarOpen(true);
    }
  };

  const handleButtonClick = () => {
    setRecomendados(true);
    navigate("/createCourse");
  };

  const handleMisCursosButton = () => {
    setRecomendados(true);
    navigate("/mycourses");
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
          <Button
            className="button-misCursos"
            variant="contained"
            onClick={handleMisCursosButton}
          >
            Mis Cursos
          </Button>

          {/* Botón de "Crear Curso" */}
          {userRole === "admin" && (
            <Button
              className="button-crear-curso"
              variant="contained"
              onClick={handleButtonClick}
            >
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

      {courses && courses.length > 0 && <Courses courses={courses} />}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{
            width: "100%",
            fontSize: "1.2em",
            padding: "20px",
            maxWidth: "600px",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Home;
