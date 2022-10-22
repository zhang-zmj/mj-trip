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
</script>

<style lang="less" scoped></style>
