<template>
  <div class="index-view">
    <HeadNav />
    <div class="content">
      <Menu />
      <router-view></router-view>
    </div>
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

  .content {
    display: flex;
    width: 100%;
    height: calc(100% - 60px);
  }
}
</style>