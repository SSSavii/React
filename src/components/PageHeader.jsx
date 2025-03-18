/* eslint-disable no-unused-vars */
// src/components/PageHeader.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { ThemeContext } from '../context/ThemeContext.jsx';

const Header = () => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <header className={`header ${darkMode ? 'dark' : 'light'}`}>
      <div className="logo">React Labs</div>
      <nav className="navigation">
        <ul>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/about">О себе</Link></li>
          <li><Link to="/counter">Счетчик</Link></li>
          <li><ThemeToggle /></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;