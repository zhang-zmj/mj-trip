import mjRequest from '../request'

export function getHomeHotSuggests() {
  return mjRequest.get({
    url: "/home/hotSuggests"
  })
}

