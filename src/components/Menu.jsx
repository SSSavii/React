/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/Menu.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';

const Menu = ({ labs, open, onClose, activeLab, onLabSelect, userRole }) => {
  const navigate = useNavigate();

  const handleLabClick = (lab) => {
    onLabSelect(lab);
    navigate(`/lab/${lab.id}`);
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <div style={{ width: 250 }}>
        <List>
          <ListItem button component={Link} to="/" onClick={onClose}>
            <ListItemText primary="Главная" />
          </ListItem>
          <ListItem button component={Link} to="/about" onClick={onClose}>
            <ListItemText primary="О себе" />
          </ListItem>
          <ListItem button component={Link} to="/counter" onClick={onClose}>
            <ListItemText primary="Счетчик" />
          </ListItem>
          <ListItem button component={Link} to="/feedback" onClick={onClose}>
            <ListItemText primary="Обратная связь" />
          </ListItem>
          
          {userRole === 'admin' && (
            <ListItem button component={Link} to="/admin" onClick={onClose}>
              <ListItemText primary="Панель администратора" />
            </ListItem>
          )}
        </List>
        
        <Divider />
        
        <List>
          <ListItem>
            <ListItemText primary="Лабораторные работы" />
          </ListItem>
          {labs.map((lab) => (
            <ListItem 
              button 
              key={lab.id}
              selected={activeLab && activeLab.id === lab.id}
              onClick={() => handleLabClick(lab)}
            >
              <ListItemText primary={lab.name} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Menu;