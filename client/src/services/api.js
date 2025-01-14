import axios from 'axios';
import { getToken, removeToken } from '../auth/auth.js';

const API_URL = 'http://localhost:3000';

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
    console.log("getGoals response.data: ", response.data);
    return response.data
  } catch (error) {
    // if (error.code === 'ERR_INSUFFICIENT_RESOURCES') {
    //   console.error('Server resource limit reached');
    //   throw new Error('Server is busy, please try again later');
    // }
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

export const editGoal = async (goalId, goalData) => {
  try {
    const response = await api.put(`/goals/${goalId}`, goalData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const deleteGoal = async (goalId) => {
  try {
    const response = await api.delete(`/goals/${goalId}`);
    return response.data
  }
  catch (error) {
    throw error.response?.data || error;
  }
};

export const createMeal = async (mealData) => {
  try {
    const response = await api.post('/meals', mealData);
    console.log('Meal created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating meal:', error)
    console.log ('Meal data to save:', mealData);
    throw error.response?.data || error;
  }
};

export const getFoodList = async () => {
  try {
    const response = await api.get('/food-items');
    // console.log("getFoodList response.data: ", response.data);
    return response.data
  } catch (error) {
    throw error.response?.data || error;
  }
}


export const getMealFoods = async (mealId) => {
  try {
    console.log('Récupération des aliments pour le repas:', mealId);
    const response = await api.get(`/meals/${mealId}/foods`);
    console.log('Réponse complète de getMealFoods : ', response.data)
    if (!response.data) {
      console.warn('Pas de données dans la réponse');
      return [];
    }
    const foods = response.data;
    console.log('Aliments récupérés:', foods);
    return foods;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// export const addFoodToMeal = async (meal, foodId) => {
//   try {
//     console.log(`Adding food ${foodId} to meal ${meal.mealId}`); 
//     const response = await api.post(`/meals/${meal.mealId}/foods`, { foodId });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error;
//   }
// };

export const removeFoodFromMeal = async (mealId, foodId) => {
  try {
    const response = await api.delete(`/meals/${mealId}/foods/${foodId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getMealByGoalId = async (goalId) => {
  try {
    const response = await api.get(`/goals/${goalId}/meal`);
    return response.data.meal;
  } catch (error) {
    if (error.response?.status === 404) {
      return null; // Pas de meal trouvé
    }
    throw error;
  }
};



export const updateMeal = async (mealData) => {
  try {
    const response = await api.put(`/meals/${mealData.mealId}`, mealData);
    return response.data;
  } catch (error) {
    console.error('Error updating meal:', error);
    throw error.response?.data || error;
  }
};


