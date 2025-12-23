<template>
  <div class="userInfo">
    <!-- <img :src="userInfo.avatar"/> -->
    <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="喵呜">
    <el-form label-position="left" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="userInfo.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userInfo.email" disabled></el-input>
      </el-form-item>
      <el-form-item label="身份">
        <el-input v-model="userInfo.identity" disabled></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import store from '@/store';
const userInfo = store.state.userInfo;

</script>
<style scoped>
.userInfo {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 30px;
  font-weight: bold;

  img {
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
    padding-left: 80px;
  }
}
</style>