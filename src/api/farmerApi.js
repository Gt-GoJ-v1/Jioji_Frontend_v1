const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const farmerApi = {
  getAllFarmers: async () => {
    const response = await fetch(`${API_BASE_URL}/farmers`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch farmers');
    return response.json();
  },

  getFarmerById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/farmers/${id}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch farmer');
    return response.json();
  },

  createFarmer: async (farmerData) => {
    const response = await fetch(`${API_BASE_URL}/farmers`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(farmerData)
    });
    if (!response.ok) throw new Error('Failed to create farmer');
    return response.json();
  },

  updateFarmer: async (id, farmerData) => {
    const response = await fetch(`${API_BASE_URL}/farmers/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(farmerData)
    });
    if (!response.ok) throw new Error('Failed to update farmer');
    return response.json();
  },

  deleteFarmer: async (id) => {
    const response = await fetch(`${API_BASE_URL}/farmers/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to delete farmer');
    return response.json();
  },

  getSurveyHistory: async (farmerId) => {
    const response = await fetch(`${API_BASE_URL}/farmers/${farmerId}/surveys`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch survey history');
    return response.json();
  }
};