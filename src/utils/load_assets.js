export const getAssetURL = imgPath => {
  // 参数一： 相对路径,  参数二：当前路径的url
  return new URL(`../assets/img/${imgPath}`, import.meta.url).href
}