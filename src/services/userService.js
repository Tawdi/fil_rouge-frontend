import axios from '@/utils/axios';

const getUsers = (params = {}) => {
  return axios.get('/admin/users', { params });
};

const getUser = (id) => {
  return axios.get(`/admin/users/${id}`);
};

const createUser = (userData) => {
  return axios.post('/admin/users', userData);
};

const updateUser = (id, userData) => {
  return axios.put(`/admin/users/${id}`, userData);
};

const deleteUser = (id) => {
  return axios.delete(`/admin/users/${id}`);
};

const changeUserStatus = (id, status) => {
  return axios.patch(`/admin/users/${id}/status`, { status });
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changeUserStatus,
};
