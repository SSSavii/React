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