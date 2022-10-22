import mjRequest from '../request'

export function getCityAll() {
  return mjRequest.get({
    url: "/city/all"
  })
}
