import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
//import Cookies from "universal-cookie";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  //const [cookies, setCookie] = useState({});
  if (window.location.pathname === "/") {
    localStorage.removeItem("authToken");
  }
  const login = async (email, password) => {
    console.log(email);
    console.log(password);
    const response = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (response.status === 200) {
      const data = await response.json();
      const role = data.role;
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userID", data.id);
      navigate("/home", { state: { role } });
    } else if (
      response.status === 400 ||
      response.status === 401 ||
      response.status === 403
    ) {
      console.log("Invalid username or password");
      alert("Invalid Username or password");
      navigate("/");
    } else {
      console.error("An error occurred while logging in");
      navigate("/");
    }
  };

  const enviarForm = (values) => {
    login(values.Email, values.Password);
  };

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },

    validationSchema: Yup.object({
      Email: Yup.string()
        .required("¡Campo Requerido!")
        .email("Correo electronico invalido")
        .max(255, "Maximo 255 caracteres"),
      Password: Yup.string()
        .required("¡Campo Requerido!")
        .min(5, "Minimo 5 caracteres"),
    }),

    onSubmit: enviarForm,
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(/assets/designUX.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                fullWidth
                label="Email Address"
                name="Email"
                autoComplete="email"
                onChange={handleChange}
                value={values.Email}
                error={!!errors.Email}
                helperText={errors.Email}
              />
              <TextField
                margin="normal"
                fullWidth
                name="Password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={handleChange}
                value={values.Password}
                error={!!errors.Password}
                helperText={errors.Password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
