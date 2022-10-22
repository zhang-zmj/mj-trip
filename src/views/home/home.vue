<template>
  <div class="home">
    <!-- 1、头部标题 -->
    <home-nav-bar />
    <!-- 2、图片 -->
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <!-- 3、位置 -->
    <home-location />
  </div>
</template>

<script setup>
import HomeNavBar from './component/home-nav-bar.vue'
import HomeLocation from './component/home-location.vue'
</script>

<style lang="less" scoped>
.banner {
  img {
    width: 100%;
  }
}
</style>
