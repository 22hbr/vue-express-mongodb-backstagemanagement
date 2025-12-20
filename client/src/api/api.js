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
export const searchAllProfiles = (data) => {
  return axios.get('/api/profiles/search',{ params: data });
};
// 根据ID查询单个资金流水接口
export const getProfileById = (id,data) => {
  return axios.get(`/api/profiles/search/${id}`,data);
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