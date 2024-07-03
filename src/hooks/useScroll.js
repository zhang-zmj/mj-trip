import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from 'vue'
import { throttle } from 'underscore'

export default function useScroll() {
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)
  const isLoading = ref(true)

  // 防抖/节流
  const scrollListenerHandler = throttle(() => {

    // const scrollListenerHandler = () => {

    clientHeight.value = document.documentElement.clientHeight
    scrollTop.value = document.documentElement.scrollTop
    scrollHeight.value = document.documentElement.scrollHeight
    console.log(scrollHeight.value, clientHeight.value, scrollTop.value);
    // if ((clientHeight.value + scrollTop.value) >= scrollHeight.value) {
    // isReachBottom.value = true

    if (scrollHeight.value - (clientHeight.value + scrollTop.value) < 100) {
      if (isLoading.value) {
        console.log("hahhahahh---");
        isReachBottom.value = true
        isLoading.value = false
      }
    }
    // }
  }, 100)

  onMounted(() => {
    window.addEventListener("scroll", scrollListenerHandler)
  })

  onActivated(() => {
    window.addEventListener("scroll", scrollListenerHandler)
  })


  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListenerHandler)
  })

  onDeactivated(() => {
    window.removeEventListener("scroll", scrollListenerHandler)
  })


  return { isLoading, isReachBottom, clientHeight, scrollTop, scrollHeight }

}

