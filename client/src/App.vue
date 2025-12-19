<template>
  <router-view />
</template>

<script setup>
import { jwtDecode } from 'jwt-decode';
import store from '@/store/index.js';
import { onMounted } from 'vue';

onMounted(() => {
  // 检查本地存储中的token
  const token = localStorage.getItem('token');
  if (token) {
    // try {
    // 解析token
    const userInfo = jwtDecode(token);
    // 更新Vuex状态
    store.dispatch('setAuthenticated', !isEmpty(userInfo));
    store.dispatch('setUserInfo', userInfo);
    // } catch (error) {
    //   // 如果token无效，可以选择清除本地存储中的token
    //   localStorage.removeItem('token');
    //   store.dispatch('setAuthenticated', false);
    //   store.dispatch('setUserInfo', {});
    // }
  } else {
    store.dispatch('setAuthenticated', false);
    store.dispatch('setUserInfo', {});
  }
});

const isEmpty = (value) => {
  return value === undefined || value === null ||
    (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);
};


</script>

<style>
html,
body,
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
  width: 100%;
  height: 100%;
}
</style>
