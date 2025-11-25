import axios from 'axios';

const API_BASE = 'http://localhost:3333';

export const api = axios.create({ baseURL: API_BASE });

export const fetchUsers = () => api.get('/users').then(res => res.data);

export const getUser = id => api.get(`/users/${id}`).then(res => res.data);

export const addUser = userData => api.post('/users', userData).then(res => res.data);

export const updateUser = async ({ id, name, class: userClass }) => {
  const res = await api.put(`/users/${id}`, { name, class: userClass });
  return res.data;
};

export const deleteUser = id => api.delete(`/users/${id}`).then(res => res.data);
