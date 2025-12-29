const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080") + "/api/v1";

export const authApi = {
  // Common login handler
  login: async (credentials, type = 'user') => {
    let endpoint = '/auth/user/login';
    if (type === 'employee') endpoint = '/auth/employee/login';
    if (type === 'admin') endpoint = '/auth/admin/login';
    if (type === 'lab') endpoint = '/auth/lab/login';

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email, // Standardizing on email for the frontend
        password: credentials.password
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `${type} login failed`);
    }

    const data = await response.json();
    return data; // Expected { accessToken, roles, userId, ... }
  },

  // User Registration
  register: async (registerData) => {
    // Mapping frontend fields to backend UserDTO
    const payload = {
      firstName: registerData.name?.split(' ')[0] || '',
      lastName: registerData.name?.split(' ').slice(1).join(' ') || '',
      email: registerData.email,
      password: registerData.password,
      mobileNumber: parseInt(registerData.phone),
      role: 'USER' // Default for public registration
    };

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Registration failed");
    }
    return response.json();
  },

  // Forgot Password
  forgotPassword: async (email) => {
    const response = await fetch(`${API_BASE_URL}/users/password/forgot?email=${encodeURIComponent(email)}`, {
      method: "POST",
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Failed to process request");
    }
    return response.json();
  },

  // Reset Password
  resetPassword: async (resetData) => {
    const response = await fetch(`${API_BASE_URL}/users/password/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resetData),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "Failed to reset password");
    }
    return response.json();
  },

  // Logout
  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    if (!response.ok) {
      console.error("Logout report failed but local state cleared.");
    }
    return response.json().catch(() => ({}));
  }
};
