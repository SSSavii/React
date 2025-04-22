/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/PageHeader.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AppBar, Toolbar, Typography, Button, IconButton, Switch, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Header = ({ isLoggedIn, userRole, onLogout, onMenuOpen }) => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          React App
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
            <Switch
              checked={darkMode}
              onChange={toggleTheme}
              color="default"
            />
          </Box>
          
          <Button color="inherit" component={Link} to="/">
            Главная
          </Button>
          
          <Button color="inherit" component={Link} to="/about">
            О себе
          </Button>
          
          <Button color="inherit" component={Link} to="/feedback">
            Обратная связь
          </Button>
          
          {userRole === 'admin' && (
            <Button color="inherit" component={Link} to="/admin">
              Админ панель
            </Button>
          )}
          
          {isLoggedIn && (
            <>
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <Typography variant="body1" sx={{ mr: 1 }}>
                {userRole === 'admin' ? 'Админ' : 'Пользователь'}
              </Typography>
              <Button color="inherit" onClick={onLogout}>
                Выйти
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;