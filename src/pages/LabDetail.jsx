/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/pages/LabDetail.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Content from '../components/Content';

const LabDetail = ({ labs, setActiveLab, activeLab }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const labId = parseInt(id);
    const lab = labs.find(lab => lab.id === labId);
    
    if (lab) {
      setActiveLab(lab);
    } else {
      navigate('/');
    }
    
    // Демонстрация useEffect с функцией очистки
    return () => {
      console.log(`Leaving lab ${id} page`);
    };
  }, [id, labs, setActiveLab, navigate]);

  return <Content activeLab={activeLab} />;
};

export default LabDetail;