<template>
  <div class="home-container">
    <p>欢迎~~</p>
    <p>欢迎使用后台管理系统</p>
 </div>
</template>
<script setup>

</script>
<style scoped>
.home-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url("../assets/background1.jpeg");
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 30px;
  font-weight: bold;
  color: white;

  p{
    padding-top: 20px;
  }
}
</style>