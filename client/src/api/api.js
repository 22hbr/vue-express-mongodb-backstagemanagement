import axios from "axios";
// 注册接口
export const registerApi = (data) => {
  return axios.post('/api/users/register', data);
};
// 登录接口
export const loginApi = (data) => {
  return axios.post('/api/users/login', data);
};
// 查询所有资金流水接口
export const searchAllProfiles = () => {
  return axios.get('/api/profiles/search');
};
// 根据ID查询单个资金流水接口
export const getProfileById = (id) => {
  return axios.get(`/api/profiles/search/${id}`);
};
// 新增资金流水接口
export const addProfile = (data) => {
  return axios.post('/api/profiles/add', data);
};
// 编辑资金流水接口
export const updateProfile = (id, data) => {
  return axios.post(`/api/profiles/update/${id}`, data);
};
// 删除资金流水接口
export const deleteProfile = (id) => {
  return axios.delete(`/api/profiles/delete/${id}`);
};