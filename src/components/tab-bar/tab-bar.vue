<template>
  <div class="tab-bar">
    <van-tabbar route v-model="currentIndex" active-color="#ff9854">
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <span class="text"> {{ item.text }}</span>
          <template #icon>
            <img :src="currentIndex === index ? getAssetURL(item.imageActive) : getAssetURL(item.image)" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import tabbarData from '@/assets/data/tabbar.js'
import { getAssetURL } from '@/utils/load_assets.js'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// 监听路由改变时, 找到对应的索引, 设置currentIndex （解决手动输入后面的几个界面，不跳转的情况）
const route = useRoute()
const currentIndex = ref(0)
watch(route, newRoute => {
  const index = tabbarData.findIndex(item => item.path === newRoute.path)
  if (index === -1) return
  currentIndex.value = index
})
</script>

<style lang="less" scoped>
.tab-bar {
  //使用vant系统的图标，局部定义一个变量：只针对tab-bar子元素生效
  // --van-tabbar-item-icon-size: 30px !important;

  // 找到类，对类中的css属性重写, 这种是没有效果的 应为使用了 scoped
  // :deep() 对子组件有穿透能力
  // :deep(.van-tabbar-item__icon) {
  //   font-size: 50px;
  // }

  img {
    height: 28px;
  }
}
</style>

<!--
修改第三方UI组件库的样式：
1、用插槽，插入自己的元素，那么在自己的作用域中直接修改这个元素
2、全局定义一个变量，覆盖它默认变量的值
  * 缺点：全局修改
3、局部定义一个变量，覆盖它默认变量的值
  * 优点：布局修改
4、直接查找对应的子组件选择器，进行修改
  * :deep(子组件元素中的选择器)进行修改
  * 直接修改CSS
-->
