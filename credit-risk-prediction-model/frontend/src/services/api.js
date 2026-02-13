// Update this with your deployed backend URL on Render
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const predictCreditRisk = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Prediction failed');
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const healthCheck = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        return await response.json();
    } catch (error) {
        console.error('Health check failed:', error);
        return { status: 'error' };
    }
};
