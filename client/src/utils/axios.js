import axios from 'axios';
import { ElLoading,ElMessage } from 'element-plus';

// 设置加载动画
let loading;
// 开始动画
const startLoading = () => {
  loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
};
// 结束动画
const endLoading = () => {
  loading.close();
};

// 请求拦截器
axios.interceptors.request.use((config => {
  // 开始加载动画
  startLoading();
  return config;
}), (error => {
  return Promise.reject(error);
}));

// 响应拦截器
axios.interceptors.response.use((response => {
  // 结束加载动画
  endLoading();
  return response;
}), (error => {
  // 结束加载动画
  endLoading();
  ElMessage.error(error.response.data);
  return Promise.reject(error);
}));

export default axios;