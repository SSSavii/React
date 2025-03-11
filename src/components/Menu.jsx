/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
const Menu = ({ labs, activeLab, onLabSelect }) => {
    return (
      <div className="menu">
        <h3>Лабораторные работы</h3>
        <ul>
          {labs.map(lab => (
            <li 
              key={lab.id} 
              className={activeLab && activeLab.id === lab.id ? 'active' : ''}
              onClick={() => onLabSelect(lab)}
            >
              {lab.id}: {lab.name}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Menu;