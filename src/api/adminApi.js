const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080") + "/api/v1/admin";

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const adminApi = {
  // --- Dashboard Stats ---
  getDashboardStats: async () => {
    const response = await fetch(`${API_BASE_URL}/users/dashboard/stats`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch dashboard stats');
    const result = await response.json();
    return result.data;
  },

  // --- Employee Management (AdminUserController) ---
  getAllEmployees: async (page = 0, size = 10) => {
    const response = await fetch(`${API_BASE_URL}/users/employees?page=${page}&size=${size}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch employees');
    return response.json(); // Returns Page<UserDTO>
  },

  getEmployeeById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/employees/${id}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch employee details');
    return response.json();
  },

  createEmployee: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users/create-employee`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to create employee');
    }
    return response.json();
  },

  updateEmployee: async (id, userData) => {
    const response = await fetch(`${API_BASE_URL}/users/employees/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Failed to update employee');
    return response.json();
  },

  deleteEmployee: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/employees/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to delete employee');
    return true;
  },

  // --- Product Management (AdminProductController) ---
  addProduct: async (productData) => {
    const response = await fetch(`${API_BASE_URL}/products/add`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Failed to add product');
    return response.json();
  },

  updateProduct: async (id, productData) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  deleteProduct: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return response.json();
  },

  toggleProductStatus: async (id, active) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}/status?active=${active}`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to update status');
    return response.json();
  },

  // --- Order Management ---
  getAllOrders: async () => {
    const response = await fetch(`${API_BASE_URL.replace('/admin', '')}/orders/all`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    const result = await response.json();
    return result.data;
  },

  getOrderById: async (id) => {
    const response = await fetch(`${API_BASE_URL.replace('/admin', '')}/orders/${id}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch order');
    const result = await response.json();
    return result.data;
  },

  updateOrderStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL.replace('/admin', '')}/orders/${id}/status?status=${status}`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to update order status');
    const result = await response.json();
    return result.data;
  },

  // --- Farmer Management ---
  getAllFarmers: async (page = 0, size = 10) => {
    const response = await fetch(`${API_BASE_URL.replace('/admin', '')}/farmer-form?page=${page}&size=${size}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch farmers');
    return response.json();
  }
};
