<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="postionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" />
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="section date-range bottom-gray-line" @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDate }}</span>
        </div>
        <div class="stay">共{{ stayCount }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDate }}</span>
        </div>
      </div>
    </div>

    <van-calendar
      v-model:show="showCalendar"
      type="range"
      color="#ff9854"
      :round="false"
      :show-confirm="false"
      @confirm="onConfirm"
    />
  </div>

  <!-- 价格/人数选择 -->
  <div class="section price-counter bottom-gray-line">
    <div class="start">价格不限</div>
    <div class="end">人数不限</div>
  </div>

  <!-- 关键字 -->
  <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

  <!-- 热门建议 -->
  <div class="section hot-suggests">
    <template v-for="(item, index) in hotSuggests" :key="index">
      <div class="item" :style="{ color: item.tagText.color, background: item.tagText.background.color }">
        {{ item.tagText.text }}
      </div>
    </template>
  </div>

  <!-- 搜索按钮 -->
  <div class="section search-btn">
    <div class="btn" @click="searchBtnClick">开始搜索</div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { formatMonthDay, getDiffDays } from '@/utils/format_date'
import useHomeStore from '@/stores/modules/home'

const router = useRouter()

const cityClick = () => {
  router.push('/city')
}

const postionClick = () => {
  navigator.geolocation.getCurrentPosition(
    res => {
      console.log('获取位置成功', res.coords.latitude)
    },
    err => {
      console.log('获取位置失败', err.coords.longitude)
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

// 日期范围的处理
const nowDate = new Date()
const newDate = new Date()
newDate.setDate(nowDate.getDate() + 1)

const startDate = ref(formatMonthDay(nowDate))
const endDate = ref(formatMonthDay(newDate))
const stayCount = ref(getDiffDays(nowDate, newDate))

const showCalendar = ref(false)
const onConfirm = value => {
  // 1.设置日期
  const selectStartDate = value[0]
  const selectEndDate = value[1]
  startDate.value = formatMonthDay(selectStartDate)
  endDate.value = formatMonthDay(selectEndDate)
  stayCount.value = getDiffDays(selectStartDate, selectEndDate)
  // 2.隐藏日历
  showCalendar.value = false
}

// 热门建议
const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)

// 搜索按钮
const searchBtnClick = () => {
  router.push({
    path: '/search',
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName
    }
  })
}
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

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}

.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.price-counter {
  .start {
    border-right: 1px solid var(--line-color);
  }
}

.hot-suggests {
  margin: 10px 0;
  height: auto;

  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}

.search-btn {
  display: flex;
  justify-content: center;
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}
</style>
