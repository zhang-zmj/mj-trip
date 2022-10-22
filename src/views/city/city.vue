<template>
  <div class="city">
    <!-- 顶部固定的部分 -->
    <div class="top">
      <form action="/">
        <van-search
          v-model="value"
          shape="round"
          show-action
          placeholder="城市/区域/位置"
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>

      <van-tabs v-model:active="tabActive" color="#ff9854">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>

    <!-- 底部滑动部分 -->
    <div class="content">
      <city-group :group-data="currentGroup" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city'
import { storeToRefs } from 'pinia'
import CityGroup from './component/city-group.vue'

const router = useRouter()
const value = ref('')
const onSearch = () => {}
const onCancel = () => {
  router.back()
}
// 2、tab栏的切换
const tabActive = ref()

// 3、网络请求
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

// 4、获取选中标签后的数据（<第二种请求数据方法）
const currentGroup = computed(() => allCities.value[tabActive.value])
</script>

<style lang="less" scoped>
.city {
  // 布局滚动
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>
