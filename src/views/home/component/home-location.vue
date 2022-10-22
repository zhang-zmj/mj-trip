<template>
  <div class="location">
    <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
    <div class="position" @click="postionClick">
      <span class="text">我的位置</span>
      <img src="@/assets/img/home/icon_location.png" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city'
import { storeToRefs } from 'pinia'
const router = useRouter()

const cityClick = () => {
  router.push('/city')
}

const postionClick = () => {
  navigator.geolocation.getCurrentPosition(
    res => {
      console.log('获取位置成功', res)
    },
    err => {
      console.log('获取位置失败', err)
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  )
}

//获取当前城市
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)
</script>

<style lang="less" scoped>
.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;
  .city {
    flex: 1;
    color: #333;
  }

  .position {
    width: 84px;
    .text {
      position: relative;
      font-size: 15px;
      top: 2px;
      color: #666;
    }
    img {
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }
  }
}
</style>
