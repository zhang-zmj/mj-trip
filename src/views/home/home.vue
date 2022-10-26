<template>
  <div class="home">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <home-location />
    <home-categories />
    <home-content />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import useHomeStore from '@/stores/modules/home'
import HomeNavBar from './component/home-nav-bar.vue'
import HomeLocation from './component/home-location.vue'
import HomeCategories from './component/home-categories.vue'
import HomeContent from './component/home-content.vue'
import { onMounted, onUnmounted } from '@vue/runtime-core'
import useScroll from '@/hooks/useScroll'
import { computed } from '@vue/reactivity'

// 发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoresData()
homeStore.fetchHouseListData()

// 监听window窗口的滚动
const { isReachBottom, scrollTop } = useScroll()
watch(isReachBottom, newValue => {
  if (newValue) {
    homeStore.fetchHouseListData().then(() => {
      isReachBottom.value = false
    })
  }
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
