<template>
  <div class="city">
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
          <van-tab :title="value.title"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="item in 100">
        <div>列表数据：{{ item }}</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city'
import { storeToRefs } from 'pinia'

const router = useRouter()
const value = ref('')

const onSearch = () => {}

const onCancel = () => {
  router.back()
}

// 2、tab栏的切换
const tabActive = ref(0)

// 3、网络请求
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)
</script>

<style lang="less" scoped>
.city {
  --van-tab-line-height: 44px;
  .top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .content {
    margin-top: 98px;
  }
}
</style>
