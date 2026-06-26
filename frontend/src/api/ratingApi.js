import api from './axiosInstance.js';

export const submitRating = (data) => api.post('/ratings', data);
export const updateRating = (storeId, data) => api.put(`/ratings/${storeId}`, data);
export const fetchMyRatings = () => api.get('/ratings/me');
export const fetchUserStoreRating = (storeId) => api.get(`/stores/${storeId}/rating`);
