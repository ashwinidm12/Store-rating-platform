import api from './axiosInstance.js';

export const fetchStores = (params) => api.get('/stores', { params });
export const fetchAdminStores = (params) => api.get('/admin/stores', { params });
export const fetchStoreDetails = (id) => api.get(`/stores/${id}`);
export const createStore = (data) => api.post('/admin/stores', data);
