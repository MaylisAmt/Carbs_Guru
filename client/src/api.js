import axios from 'axios';
import { getToken, removeToken } from './auth.js';

const API_URL = 'http://localhost:3000'; // Replace with your backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If the server responds with a 401 status, remove the token and redirect to login
      removeToken();
      window.location = '/signin';
    }
    return Promise.reject(error);
  }
);

export const signup = async (userData) => {
  try {
    const response = await api.post('/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signin = async (credentials) => {
  try {
    const response = await api.post('/signin', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signout = async () => {
  try {
    const response = await api.post('/signout');
    removeToken(); // Remove the token from storage
    return response.data;
  } catch (error) {
    // Still remove the token even if the API call fails
    removeToken();
    throw error.response?.data || error;
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getGoals = async () => {
  try {
    const response = await api.get('/goals');
    return response.data
  } catch (error) {
    if (error.code === 'ERR_INSUFFICIENT_RESOURCES') {
      console.error('Server resource limit reached');
      throw new Error('Server is busy, please try again later');
    }
    throw error.response?.data || error;
  }
}

export const setGoal = async (goalData) => {
  console.log("goal data: ", goalData)
  try {
    const response = await api.post('/goals', goalData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}