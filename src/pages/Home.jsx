/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/pages/Home.jsx
import React from 'react';
import Menu from '../components/Menu';
import Content from '../components/Content';

const Home = ({ labs, activeLab, handleLabSelect }) => {
  return (
    <div className="main-content">
      <Menu 
        labs={labs} 
        activeLab={activeLab} 
        onLabSelect={handleLabSelect} 
      />
      <Content activeLab={activeLab} />
    </div>
  );
};

export default Home;