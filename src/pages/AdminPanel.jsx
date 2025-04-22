/* eslint-disable no-unused-vars */
// src/pages/AdminPanel.jsx
import React, { useState } from 'react';
import UsersTable from '../components/UsersTable';
import FeedbackList from '../components/FeedbackList';
import { Box, Tabs, Tab } from '@mui/material';

const AdminPanel = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="admin-panel">
      <h2>Панель администратора</h2>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Пользователи" id="tab-0" />
          <Tab label="Обратная связь" id="tab-1" />
        </Tabs>
      </Box>
      
      <Box sx={{ padding: 2 }}>
        {tabValue === 0 && <UsersTable />}
        {tabValue === 1 && <FeedbackList isAdmin={true} />}
      </Box>
    </div>
  );
};

export default AdminPanel;