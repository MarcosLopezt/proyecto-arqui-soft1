import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Button, Avatar, Menu, MenuItem, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import './Componentes.css';

function Navbar() {
  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);

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
        <img src="/imagenes/logo.png" alt="SkillUp" style={{ height: '50px', marginRight: '20px', borderRadius: '50%' }} />
        <span style={{ fontSize: '1.5rem' }}>SkillUp</span>
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
        <Button className="button-misCursos" variant="contained" >
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
