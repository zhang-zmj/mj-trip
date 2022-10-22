<template>
  <div class="city-group">
    <van-index-bar>
      <template v-for="(group, index) in groupData?.cities" :key="index">
        <van-index-anchor :index="group.group" />
        <template v-for="(item, indey) in group.cities" :key="indey">
          <van-cell :title="item.cityName" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang="less" scoped></style>
