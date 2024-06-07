import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();

  const login = async (email, password) => {
    console.log(email);
    console.log(password);
    let role = "user";
    console.log(role);
    const response = await fetch("http://localhost:8080/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password, role: role }),
    });

    if (response.status === 201) {
      const data = await response.json();
      console.log(data);
      navigate("/home");
    } else if (
      response.status === 400 ||
      response.status === 401 ||
      response.status === 403
    ) {
      // Manejar caso de credenciales inválidas
      console.log("Invalid username or password");
      alert("Invalid Username or password");
    } else {
      // Manejar otros errores de la solicitud
      console.error("An error occurred while logging in");
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
      Password2: Yup.string()
        .required("¡Campo Requerido!")
        .oneOf([Yup.ref("Password")], "Las contraseñas deben coincidir"),
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
            backgroundImage: `url(/assets/register.jpg)`,
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
                required
                fullWidth
                onChange={handleChange}
                label="Email Address"
                name="Email"
                autoComplete="email"
                value={values.Email}
                error={!!errors.Email}
                helperText={errors.Email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Password"
                type="password"
                value={values.Password}
                autoComplete="current-password"
                onChange={handleChange}
                error={!!errors.Password}
                helperText={errors.Password}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Password2"
                label="Confirm Password"
                type="password"
                value={values.Password2}
                autoComplete="current-password"
                onChange={handleChange}
                error={!!errors.Password2}
                helperText={errors.Password2}
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
                  <Link href="#" variant="body2"></Link>
                </Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Already have an account? Login"}
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
