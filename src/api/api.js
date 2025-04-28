// src/api/api.js
const API_URL = 'http://localhost:3001';

const delay = (ms) => new Promise(res => setTimeout(res, ms)); // Функция задержки

export const fetchFeedbacks = async () => {
  await delay(1000); // Добавляем задержку в 1 секунду (можно настроить)
  const response = await fetch(`${API_URL}/feedbacks`);
  if (!response.ok) {
    throw new Error('Failed to fetch feedbacks');
  }
  return response.json();
};

export const addFeedback = async (feedback) => {
  await delay(500); // Задержка перед POST запросом
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
  await delay(500); // Задержка перед DELETE запросом
  const response = await fetch(`${API_URL}/feedbacks/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete feedback');
  }
  return id;
};

export const blockFeedbackApi = async (id) => {
  await delay(500); // Задержка перед PATCH запросом
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
  await delay(500); // Задержка перед GET запросом
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const toggleUserBlockApi = async (id) => {
   await delay(500); // Задержка перед PATCH запросом
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
   await delay(500); // Задержка перед DELETE запросом
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
  return id;
};

export const updateUserProfile = async (userId, userData) => {
   await delay(500); // Задержка перед PUT запросом
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