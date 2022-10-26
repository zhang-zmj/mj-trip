import { getHomeCategories, getHomeHotSuggests, getHomeHouselist } from '@/services'
import { defineStore } from "pinia";

const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: [],
    currentPage: 1,
    houselist: []
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoresData() {
      const res = await getHomeCategories()
      this.categories = res.data
    },

    async fetchHouseListData() {
      const res = await getHomeHouselist(this.currentPage)
      this.houselist = res.data
      this.currentPage++
    }
  }
})

export default useHomeStore
