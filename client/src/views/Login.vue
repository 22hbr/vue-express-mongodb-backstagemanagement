<template>
  <div class="register">
    <div class="content">
      <h1>在线后台管理系统</h1>
      <div class="form-content">
        <el-form label-width="80px" label-position="left" :model="LoginForm" ref="loginRef" :rules="rules">

          <el-form-item label="邮箱" required prop="email">
            <el-input v-model="LoginForm.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="密码" required prop="password">
            <el-input v-model="LoginForm.password" placeholder="请输入密码" type="password" show-password />
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="loginConfirm">登录</el-button>
        <p>还没有账号？现在<span @click="gotoRegister">注册</span></p>
      </div>
    </div>

  </div>
</template>
<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { loginApi } from '@/api/api';
//  searchAllProfiles, getProfileById, addProfile, updateProfile, deleteProfile
import router from '@/router/index';

const loginRef = ref();
const LoginForm = ref({
  email: '',
  password: ''
});

// 需要添加prop才能使rules生效
const rules = ref({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ]
});

// const register = async () => {
//   try {
//     await registerRef.value.validate();
//     const params = {
//       username: registerForm.value.username,
//       email: registerForm.value.email,
//       password: registerForm.value.password,
//       identity: registerForm.value.identity
//     };
//     const res = await registerApi(params);
//     console.log(res,'----------------');
//     if (res.data.code == 1) {
//       ElMessage.success('注册成功');
//       router.push('/login');
//     } else {
//       // ElMessage.error(res.msg);
//       ElMessage.error(res.response.data.msg || '注册失败');
//     }
//   } catch (error) {
//     console.log(error);
//   };
// };

const loginConfirm = async () => {
  try {
    await loginRef.value.validate();
    const params = {
      email: LoginForm.value.email,
      password: LoginForm.value.password
    };
    const res = await loginApi(params);
    if (res.data.code == 1) {
      ElMessage.success('登录成功');
      // 存储token到本地存储
      localStorage.setItem('token', res.data.token);
      router.push('/');
    } else {
      ElMessage.error(res.response.data.msg || '登录失败');
    }
  } catch (error) {
    console.log(error);
  };
};

const gotoRegister = () => {
  router.push('/register');
};

</script>
<style scoped>
.register {
  background-image: url("../assets/background2.jpg");
  width: 100%;
  height: 100%;

  .content {
    width: 30%;
    text-align: center;
    margin: 0 auto;

    h1 {
      padding: 100px 0 40px;
      color: white;
      font-weight: bold;
      font-size: 30px;
    }

    .form-content {
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding: 20px;
      background-color: rgba(255, 255, 255, 0.7);
      color: black;
      border-radius: 5%;

      p {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;

        span {
          color: rgba(37, 124, 224, 0.795);
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>