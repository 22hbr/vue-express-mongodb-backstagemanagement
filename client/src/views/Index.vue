<template>
  <div class="index-view">
    <HeadNav />
    <Menu />
  </div>
</template>

<script setup>
  import HeadNav from '@/components/HeadNav.vue';
  import Menu from '@/components/Menu.vue';
</script>

<style scoped>
.index-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url("../assets/background1.jpeg");
  background-size: cover;
}
</style>