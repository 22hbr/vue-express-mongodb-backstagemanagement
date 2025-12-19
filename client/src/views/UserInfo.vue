<template>
  <div class="userInfo">
    <!-- <img :src="userInfo.avatar"/> -->
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
import { onMounted } from 'vue';
const userInfo = store.state.userInfo;
onMounted(() => {
  console.log("用户信息：",userInfo);
});

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
}
</style>