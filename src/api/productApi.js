const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const productApi = {
  getAllProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getProductById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  createProduct: async (productData) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData)
    });
    if (!response.ok) throw new Error('Failed to create product');
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

  getAllCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  }
};