/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/Menu.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ labs, activeLab, onLabSelect }) => {
  return (
    <div className="menu">
      <h3>Лабораторные работы</h3>
      <ul>
        {labs.map(lab => (
          <li 
            key={lab.id} 
            className={activeLab && activeLab.id === lab.id ? 'active' : ''}
          >
            <Link to={`/lab/${lab.id}`} onClick={() => onLabSelect(lab)}>
              {lab.id}: {lab.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;