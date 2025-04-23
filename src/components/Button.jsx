/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;