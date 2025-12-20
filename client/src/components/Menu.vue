<template>
  <div class="menu">
    <!-- rgba(32, 106, 225, 0.5) -->
    <el-menu background-color="rgb(143,180,240)" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose"
      @select="handleMenuSelect">
      <el-menu-item index="/home">
        <el-icon>
          <House />
        </el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-sub-menu index="/fundList">
        <template #title>
          <el-icon>
            <operation />
          </el-icon>
          <span>资金管理</span>
        </template>
        <el-menu-item index="/fundList">
          <el-icon>
            <document />
          </el-icon>
          资金流水</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/userInfo">
        <el-icon>
          <setting />
        </el-icon>
        <span>个人信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup>
import { House, Operation, Setting, Document } from '@element-plus/icons-vue'
import router from '@/router/index';
const handleMenuSelect = (indexPath) => {
  router.push(indexPath)
};
</script>
<style scoped>
.menu {
  width: 200px;
  height: 100%;
  background-color: rgba(32, 106, 225, 0.5);
}
</style>