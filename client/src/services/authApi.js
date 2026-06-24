import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Set auth token from localStorage if available
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

/**
 * Decodes a JWT token and returns the payload.
 * @param {string} token
 * @returns {object|null} The decoded payload or null if invalid
 */
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    // Convert base64url to standard base64
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    // Decode base64 to get the JSON string
    const jsonString = atob(base64);

    // Parse the JSON string
    return JSON.parse(jsonString);
  } catch (e) {
    // Return null on any error instead of the error object
    return null;
  }
};

/**
 * Login user with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{token: string}>}
 */
export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
  // Assuming the response is { token: '...' }
  const { token } = response.data;
  // Store token in localStorage
  localStorage.setItem('token', token);
  // Also set axios default headers for future requests
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return response.data;
};

/**
 * Logout user by removing token and clearing axios default header
 */
export const logout = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
};

/**
 * Get the current user from token (by decoding the JWT)
 * @returns {object|null} The user object from token payload or null if invalid/no token
 */
export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  return decodeToken(token);
};

/**
 * Set token in localStorage and axios headers (used when refreshing token or restoring session)
 * @param {string} token
 */
export const setToken = (token) => {
  localStorage.setItem('token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

/**
 * Get token from localStorage
 * @returns {string|null}
 */
export const getToken = () => {
  return localStorage.getItem('token');
};