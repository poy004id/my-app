// apiService.js
import axios from 'axios';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { EXPO_PUBLIC_API_URL } from '@env'; // Make sure to set this in your environment variables

// Create an Axios instance
const apiService = axios.create({
  baseURL: EXPO_PUBLIC_API_URL, // Set your base API URL
  timeout: 15000, // Set a timeout limit (in ms)
});

// Request Interceptor
apiService.interceptors.request.use(
  async (config) => {
    // Add JSON headers
    config.headers['Content-Type'] = 'application/json';
    const accessToken = await SecureStore.getItemAsync('accessToken');

    // Add Authorization header if token exists
    const user = auth().currentUser;
    if (user) {
    //   const token = await user.getIdToken();
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    // Log request error
    console.log('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiService.interceptors.response.use(
  (response) => {
    // Any response-related transformation if needed
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized
    if (error.response && error.response.status === 401) {
      Alert.alert('Session Expired', 'Please log in again.');
      // Optionally, add a function to log the user out or navigate to login
    }

    // Network error handling
    if (error.message === 'Network Error') {
      Alert.alert('Network Error', 'Please check your internet connection.');
    }

    console.log('Response Error:', error);
    return Promise.reject(error);
  }
);

export default apiService;
