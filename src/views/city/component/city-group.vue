<template>
  <div class="city-group">




    
    <!-- 第一种请求数据方法 -->
    <!-- <template v-for="item in allCities[tabActive]?.cities"> -->
    <template v-for="(group, index) in groupData?.cities" :key="index">
      <div class="group-item">
        <h2 class="title">标题：{{ group.group }}</h2>
        <div class="list">
          <template v-for="(item, indey) in group.cities" :key="indey">
            <div class="city">{{ item.cityName }}</div>
          </template>
        </div>
      </div>
    </template>
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
