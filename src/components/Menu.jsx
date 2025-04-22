/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/Menu.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Menu = ({ labs, open, onClose, activeLab, onLabSelect }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        {labs.map((lab) => (
          <ListItem
            button
            key={lab.id}
            component={Link}
            to={`/lab/${lab.id}`}
            onClick={() => {
              onLabSelect(lab);
              onClose(); // Закрываем меню после выбора
            }}
            selected={activeLab && activeLab.id === lab.id}
          >
            <ListItemText primary={`${lab.id}: ${lab.name}`} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Menu;