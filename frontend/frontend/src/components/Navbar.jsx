import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Button, Avatar, Menu, MenuItem, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import './Componentes.css';
import { SearchBar } from './SearchBar';

function Navbar(props) {
  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Establece el rol del usuario solo una vez en el montaje del componente
    setUserRole(props.role);
  }, [props.role]);

  const handleLogoutClick = () => {
    setLogoutOpen(true);
  };

  const handleLogoutClose = () => {
    setLogoutOpen(false);
  };

  const logout = () => {
    document.cookie = 'session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    navigate("/");
  };

  return (
    <AppBar className="navbar" position="static" sx={{ backgroundColor: '#785589'}} >
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Logo
        </Typography>

        {/* Barra de búsqueda */}
        <div style={{ marginRight: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: '4px', paddingLeft: '10px' }}>
            <SearchIcon />
            <SearchBar />
          </div>
        </div>

        {/* Botón de "Mis Cursos" */}
        <Button className="button-misCursos" variant="contained" >
          Mis Cursos
        </Button>

           {/* Botón de "Crear Curso" */}
           {userRole === 'admin' && (
        <Button className="button-crear-curso" variant="contained" >
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
          anchorEl={logoutOpen ? document.getElementById('profile-icon') : null}
          open={logoutOpen}
          onClose={handleLogoutClose}
        >
          <div className='list-conteiner'>
          <List>
            <ListItemButton onClick={logout} className='button-logout'>
              <ListItemIcon>
                <LogoutIcon className='icon-logout' />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
