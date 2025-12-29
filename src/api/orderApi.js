const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080") + "/api/v1/orders";

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const orderApi = {
    createOrder: async (orderData) => {
        const response = await fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(orderData)
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || 'Failed to create order');
        }
        return response.json();
    },

    getMyOrders: async (userId) => {
        const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch orders');
        const result = await response.json();
        return result.data;
    },

    getOrderById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch order');
        const result = await response.json();
        return result.data;
    }
};
