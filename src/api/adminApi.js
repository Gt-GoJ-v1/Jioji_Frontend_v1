const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const adminApi = {
  getDashboardStats: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch dashboard stats');
    return response.json();
  },

  getAllEmployees: async () => {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch employees');
    return response.json();
  },

  getEmployeeById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch employee');
    return response.json();
  },

  createEmployee: async (employeeData) => {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(employeeData)
    });
    if (!response.ok) throw new Error('Failed to create employee');
    return response.json();
  },

  updateEmployee: async (id, employeeData) => {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(employeeData)
    });
    if (!response.ok) throw new Error('Failed to update employee');
    return response.json();
  },

  deleteEmployee: async (id) => {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to delete employee');
    return response.json();
  },

  getAllOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  getOrderById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  },

  updateOrderStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    if (!response.ok) throw new Error('Failed to update order status');
    return response.json();
  }
};