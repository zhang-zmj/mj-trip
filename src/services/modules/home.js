import mjRequest from '../request'

export function getHomeHotSuggests() {
  return mjRequest.get({
    url: "/home/hotSuggests"
  })
}

export function getHomeCategories() {
  return mjRequest.get({
    url: "/home/categories"
  })
}

export function getHomeHouselist(currentPage) {
  return mjRequest.get({
    url: "/home/houselist",
    params: {
      page: currentPage
    }
  })
}

