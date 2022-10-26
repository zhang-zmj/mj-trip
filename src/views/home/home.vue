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
    <!-- 4、分类 -->
    <home-categories />
    <!-- 5、列表内容 -->
    <home-content />
  </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home'
import HomeNavBar from './component/home-nav-bar.vue'
import HomeLocation from './component/home-location.vue'
import HomeCategories from './component/home-categories.vue'
import HomeContent from './component/home-content.vue'
import { onMounted } from '@vue/runtime-core'

// 发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoresData()

// 监听window窗口的滚动
const scrollListenerHandler = () => {
  const clientHeight = document.documentElement.clientHeight
  const scrollTop = document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight //整个home内容的高度
  if (clientHeight + scrollTop >= scrollHeight) {
    homeStore.fetchHouseListData()
  }
}

onMounted(() => {
  window.addEventListener('scroll', scrollListenerHandler)
}),
  onUnmounted(() => {
    window.removeEventListener('scroll', scrollListenerHandler)
  })
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 60px;
}

.banner {
  img {
    width: 100%;
  }
}

// .search-bar {
//   position: fixed;
//   z-index: 9;
//   top: 0;
//   left: 0;
//   right: 0;
//   height: 45px;
//   padding: 16px 16px 10px;
//   background-color: #fff;
// }
</style>
