import api from './axiosInstance.js';

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (data) => api.post('/auth/register', data);
export const logout = () => api.post('/auth/logout');
export const changePassword = (data) => api.post('/auth/change-password', data);
export const getProfile = () => api.get('/users/profile');
