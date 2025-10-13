import axios from "axios";


const API_URL = 'http://localhost:3000/api/auth';

export const loginUser = async (email: string, password: string, device_id: string, push_token: string | null) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password, device_id, push_token });
    return response.data;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
}

export const registerUser = async (email: string, password: string, username: string, device_id: string, push_token: string | null) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { email, password, username, device_id, push_token });
        return response.data;
    } catch (error) {
        console.error('Registration failed', error);
        throw error;
    }
}

export const verifyEmailUser = async (email: string, token: string) => {
    try {
        const response = await axios.post(`${API_URL}/verify-email`, { email, token });
        return response.data;
    } catch (error) {
        console.error('Email verification failed', error);
        throw error;
    }
}

export const logoutUser = async (device_id: string, access_token: string) => {
    try {
        const response = await axios.post(`${API_URL}/logout`, { device_id, access_token });
        return response.data;
    } catch (error) {
        console.error('Logout failed', error);
        throw error;
    }
}