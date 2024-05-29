import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from "yup"
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const usuarios = [
  { email: "marcos.lopez@gmail", password: "12345" },
  { email: "marcos.lopez@mindfactory.ar", password: "12345" },
  { email: "marc12@gmail", password: "11111" },
];

export default function Login() {

  const navigate = useNavigate();

  const enviarForm = (values) => {
    const userValid = usuarios.find((usuario) => usuario.email === values.Email && usuario.password === values.Password);
    if (userValid) {
      navigate("/home");
    } else {
      alert("Invalid Username or password");
      console.log("Invalid User");
    }
  };

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      Email: "",
      Password: ""
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

    onSubmit: enviarForm


  })

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                    {"Don't have an account? Register"}
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