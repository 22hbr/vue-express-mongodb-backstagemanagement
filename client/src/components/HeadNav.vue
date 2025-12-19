<template>
  <div class="head-nav">
    <el-row>
      <el-col :span="12" class="logo">
        <img src="../assets/cat_logo.png" alt="(>^ω^<)喵">
        <span>在线后台管理系统</span>
      </el-col>
      <el-col :span="12" class="userInfo">
        <el-avatar :size="40" :src="avatarUrl" />
        <el-dropdown>
          <span>{{username }}</span>
          <!-- <el-icon><ArrowDown /></el-icon> -->
           <!-- <el-icon class="el-icon--right"><ArrowDown /></el-icon> -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handlePersonalInfo">个人信息</el-dropdown-item>
              <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
// import { ArrowDown } from '@element-plus/icons-vue'
import router from "@/router";
import { ElMessage } from "element-plus";
import store from "@/store";

const avatarUrl = store.state.userInfo.avatar;
const username = store.state.userInfo.username;

const handlePersonalInfo = () =>{
  router.push("/userInfo");
}

const handleLogout = () =>{
  localStorage.removeItem("token");
  store.dispatch("clearUserInfo");
  router.push("/login");
  ElMessage.success("已退出登录");
}

</script>
<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  background-color: rgba(32, 106, 225, 0.5);

  .logo {
    display: flex;
    align-items: center;

    img {
      height: 60px;
      width: 60px;
    }

    span {
      font-size: 24px;
      color: black;
      margin-left: 10px;
      font-weight: bold;
    }

  }

  .userInfo {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    span {
      margin: 0 20px 0 10px;
      font-size: 18px;
      font-weight: bold;
      /* color: black; */


      cursor: pointer;
      color: var(--el-color-primary);
    }
  }
}
</style>