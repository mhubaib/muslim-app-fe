import axios from "axios";


const API_URL = 'http://172.40.0.96:3000/api/auth';

export const loginUser = async (email: string, password: string, device_id: string, push_token: string | null) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password, device_id, push_token });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Login failed')
        }
        console.error('Login failed', error);
        throw new Error('Network error or unexpected issue');
    }
}

export const registerUser = async (email: string, password: string, username: string, device_id: string, push_token: string | null) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { email, password, username, device_id, push_token });
        console.log(response, response.data)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Register failed')
        }
        console.error('Register failed', error);
        throw new Error('Network error or unexpected issue');
    }
}

export const verifyEmailUser = async (email: string, otp: string) => {
    try {
        const response = await axios.post(`${API_URL}/verify-otp`, { email, otp });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Verify email failed')
        }
        console.error('Verify email failed', error);
        throw new Error('Network error or unexpected issue');
    }
}

export const logoutUser = async (device_id: string, access_token: string) => {
    try {
        const response = await axios.post(`${API_URL}/logout`, { device_id, access_token });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Logout failed')
        }
        console.error('Logout failed', error);
        throw new Error('Network error or unexpected issue');
    }
}