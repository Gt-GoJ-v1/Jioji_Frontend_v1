const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080") + "/api/v1/lab-reports";

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const labReportApi = {
    getAllReports: async () => {
        const response = await fetch(`${API_BASE_URL}/all`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch lab reports');
        const result = await response.json();
        return result.data;
    },

    getReportsByFarmerId: async (farmerId) => {
        const response = await fetch(`${API_BASE_URL}/farmer/${farmerId}`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch farmer reports');
        const result = await response.json();
        return result.data;
    },

    createReport: async (reportData) => {
        const response = await fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(reportData)
        });
        if (!response.ok) throw new Error('Failed to create report');
        const result = await response.json();
        return result.data;
    },

    updateReportStatus: async (id, status, details = '') => {
        const response = await fetch(`${API_BASE_URL}/${id}/status?status=${status}&details=${details}`, {
            method: 'PUT',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to update report status');
        const result = await response.json();
        return result.data;
    }
};
