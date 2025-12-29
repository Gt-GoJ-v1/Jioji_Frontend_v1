const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080") + "/api/v1/admin/users";
const AUTH_API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080") + "/api/v1/auth";

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
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch farmer');
    return response.json();
  },

  createFarmer: async (farmerData) => {
    const response = await fetch(`${AUTH_API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...farmerData, role: 'USER' })
    });
    if (!response.ok) throw new Error('Failed to create farmer');
    return response.json();
  },

  updateFarmer: async (id, farmerData) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(farmerData)
    });
    if (!response.ok) throw new Error('Failed to update farmer');
    return response.json();
  },

  deleteFarmer: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to delete farmer');
    return response.json();
  },

  getSurveyHistory: async (farmerId) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/v1/survey?farmerId=${farmerId}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch survey history');
    return response.json();
  }
};