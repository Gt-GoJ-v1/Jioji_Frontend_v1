const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080") + "/api/v1/products";

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const productApi = {
  // Public/User list products
  getAllProducts: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/list?${query}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to fetch products');
    }
    const result = await response.json();
    return result.data; // ResponseDto.data contains PageResponseDto
  },

  getProductById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to fetch product');
    }
    const result = await response.json();
    return result.data; // ResponseDto.data contains ProductDto
  },

  // Admin create product
  createProduct: async (productData) => {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData)
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to create product');
    }
    const result = await response.json();
    return result.data;
  },

  updateProduct: async (id, productData) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(productData)
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to update product');
    }
    const result = await response.json();
    return result.data;
  },

  deleteProduct: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to delete product');
    }
    const result = await response.json();
    return result.data;
  }
};
