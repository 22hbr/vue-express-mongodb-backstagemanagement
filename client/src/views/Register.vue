<template>
  <div class="register">
    <div class="content">
      <h1>在线后台管理系统</h1>
      <div class="form-content">
        <el-form label-width="80px" label-position="left" :model="registerForm" ref="registerRef" :rules="rules">
          <el-form-item label="用户名" required prop="username">
            <el-input v-model="registerForm.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="邮箱" required prop="email">
            <el-input v-model="registerForm.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="密码" required prop="password">
            <el-input v-model="registerForm.password" placeholder="请输入密码" type="password" show-password />
          </el-form-item>
          <el-form-item label="确认密码" required prop="newPassword">
            <el-input v-model="registerForm.newPassword" placeholder="请确认密码" type="password" show-password />
          </el-form-item>
          <el-form-item label="身份" required prop="identity">
            <el-select v-model="registerForm.identity" placeholder="请选择身份">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="员工" value="employee"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="register">注册</el-button>
      </div>
    </div>

  </div>
</template>
<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { registerApi,loginApi,searchAllProfiles,getProfileById,addProfile,updateProfile,deleteProfile } from '@/api/api';
import router from '@/router/index';

const registerRef = ref();
const registerForm = ref({
  username: '',
  email: '',
  password: '',
  newPassword: '',
  identity: ''
});

// 需要添加prop才能使rules生效
const rules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.value.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      }, trigger: 'blur'
    }
  ],
  identity: [
    { required: true, message: '请选择身份', trigger: 'change' }
  ]
});


// const register = async() => {
//   registerRef.value.validate((valid) => {
//     if (valid) {
//       console.log('注册信息：', registerForm.value);
//       // 在这里处理注册逻辑，例如发送请求到后端
//       const res = await register(registerForm.value);
//       if(res.code == 200){
//         ElMessage.success('注册成功');
//         // 跳转到登录页面
//         router.push('/login');
//       } else {
//         ElMessage.error(res.message);
//       }
//     } else {
//       console.log('注册信息验证失败');
//       return false;
//     }
//   });
// }

const register = async () => {
  try {
    await registerRef.value.validate();
    const params = {
      username: registerForm.value.username,
      email: registerForm.value.email,
      password: registerForm.value.password,
      identity: registerForm.value.identity
    };
    const res = await registerApi(params);
    console.log(res,'----------------');
    if (res.data.code == 1) {
      ElMessage.success('注册成功');
      router.push('/login');
    } else {
      // ElMessage.error(res.msg);
      ElMessage.error(res.response.data.msg || '注册失败');
    }
  } catch (error) {
    console.log(error);
  };
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
    }
  }
}
</style>