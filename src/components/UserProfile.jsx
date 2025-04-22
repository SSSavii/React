/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/UserProfile.jsx
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import EditProfileForm from './EditProfileForm';

const UserProfile = ({ onLogout }) => {
  const [editing, setEditing] = useState(false);
  const username = localStorage.getItem('savedLogin');

  if (editing) {
    return (
      <EditProfileForm
        user={{
          id: 1,
          login: username,
          email: '',
        }}
        onCancel={() => setEditing(false)}
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="body1" sx={{ mr: 2 }}>
        {username}
      </Typography>
      <Button variant="outlined" sx={{ mr: 2 }} onClick={() => setEditing(true)}>
        Редактировать
      </Button>
      <Button variant="contained" color="primary" onClick={onLogout}>
        Выйти
      </Button>
    </Box>
  );
};

export default UserProfile;