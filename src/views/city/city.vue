<template>
  <div class="city">
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
      <van-tab title="国内港澳台">国内港澳台</van-tab>
      <van-tab title="海外">海外</van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const value = ref('')

const onSearch = () => {}

const onCancel = () => {
  router.back()
}

// 2、tab栏的切换
const tabActive = ref(0)
</script>

<style lang="less" scoped>
.city {
  --van-tab-line-height: 44px;
}
</style>
