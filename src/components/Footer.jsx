/* eslint-disable no-unused-vars */
// src/components/Footer.jsx
import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Feedback as FeedbackIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction
        label="Обратная связь"
        icon={<FeedbackIcon />}
        component={Link}
        to="/feedback"
      />
      {/* Добавьте другие элементы нижнего меню по мере необходимости */}
    </BottomNavigation>
  );
};

export default Footer;