/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/PageHeader.jsx
import React, { useContext } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Switch } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext.jsx';

const Header = ({ isLoggedIn, onLogout, onMenuOpen }) => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onMenuOpen} // Обработчик открытия меню
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          React Labs
        </Typography>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>
          Главная
        </Link>
        <Link to="/about" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>
          О себе
        </Link>
        <Switch checked={darkMode} onChange={toggleTheme} color="default" />
        {isLoggedIn && (
          <button onClick={onLogout} style={{color: 'white'}}>
            Выйти
          </button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;