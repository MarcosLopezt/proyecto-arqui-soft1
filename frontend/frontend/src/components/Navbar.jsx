import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Button, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Componentes.css'

function Navbar() {
    return (
      <AppBar className="navbar" position="static" >
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Logo
          </Typography>
  
          {/* Barra de búsqueda */}
          <div style={{ marginRight: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: '4px', paddingLeft: '10px' }}>
              <SearchIcon />
              <InputBase
                placeholder="Buscar..."
                inputProps={{ 'aria-label': 'buscar' }}
                style={{ marginLeft: '10px' }}
              />
            </div>
          </div>
  
          {/* Botón de "Mis Cursos" */}
          <Button className="button-misCursos" variant="contained"  style={{ marginRight: '20px' }}>
            Mis Cursos
          </Button>
  
          {/* Icono de perfil */}
          <IconButton>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

    );
  }

export default Navbar;
