// src/api/api.js
const API_URL = 'http://localhost:3001';

export const fetchFeedbacks = async () => {
  const response = await fetch(`${API_URL}/feedbacks`);
  if (!response.ok) {
    throw new Error('Failed to fetch feedbacks');
  }
  return response.json();
};

export const addFeedback = async (feedback) => {
  const response = await fetch(`${API_URL}/feedbacks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feedback),
  });
  if (!response.ok) {
    throw new Error('Failed to add feedback');
  }
  return response.json();
};

export const deleteFeedback = async (id) => {
  const response = await fetch(`${API_URL}/feedbacks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete feedback');
  }
  return id;
};

export const blockFeedbackApi = async (id) => {
  // Получаем текущее состояние отзыва
  const getFeedback = await fetch(`${API_URL}/feedbacks/${id}`);
  if (!getFeedback.ok) {
    throw new Error('Failed to fetch feedback');
  }
  const feedback = await getFeedback.json();
  
  // Обновляем статус блокировки
  const response = await fetch(`${API_URL}/feedbacks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      blocked: !feedback.blocked,
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to block/unblock feedback');
  }
  return response.json();
};

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const toggleUserBlockApi = async (id) => {
  // Получаем текущее состояние пользователя
  const getUser = await fetch(`${API_URL}/users/${id}`);
  if (!getUser.ok) {
    throw new Error('Failed to fetch user');
  }
  const user = await getUser.json();
  
  // Обновляем статус блокировки
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      status: user.status === 'active' ? 'blocked' : 'active',
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to block/unblock user');
  }
  return response.json();
};

export const deleteUserApi = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
  return id;
};

export const updateUserProfile = async (userId, userData) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Failed to update user profile');
  }
  return response.json();
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  const user = await response.json();
  
  if (user.status === 'blocked') {
    throw new Error('User is blocked');
  }
  
  return user;
};