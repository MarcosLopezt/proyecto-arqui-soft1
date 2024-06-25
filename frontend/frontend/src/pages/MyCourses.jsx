import React, { useState, useEffect } from "react";
import "./Home.css";
import Courses from "../components/Courses";
import { useLocation } from "react-router-dom";
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
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import "../components/Componentes.css";

function Home() {
  const location = useLocation();
  const role = location.state?.role;

  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState(true);

  useEffect(() => {
    setUserRole(role);
  }, [role]);

  useEffect(() => {
    if (myCourses) {
      searchMyCourses();
    }
  }, [myCourses]);

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

  const searchMyCourses = async () => {
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
      setMyCourses(false);
      cursos.forEach((curso) => {
        getCourseById(curso.course_id);
      });
    } else {
      console.log("No esta subscripto");
    }
  };

  const getCourseById = async (courseID) => {
    const response = await fetch(
      `http://localhost:8080/cursos/get/${courseID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const course = await response.json();
      setCourses((prevCourses) => {
        const updatedCourses = [...prevCourses, course];
        //console.log(updatedCourses);
        return updatedCourses;
      });
    } else {
      console.log("No existe el curso");
    }

    //console.log(courses);
  };

  const handleButtonClick = () => {
    navigate("/createCourse");
  };

  const handleHomeButton = () => {
    navigate("/home");
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

          {/* Barra de búsqueda
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
          </div> */}

          {/* Botón de "Home" */}
          <Button
            className="button-misCursos"
            variant="contained"
            onClick={handleHomeButton}
          >
            Home
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
      <Courses courses={courses}></Courses>
    </>
  );
}

export default Home;
