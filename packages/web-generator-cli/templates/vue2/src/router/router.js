import Vue from 'vue'
import VueRouter from 'vue-router'

// 重写push，解决路由重复跳转报错
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch((err) => err)
}
// 重写replace，解决路由重复跳转报错
const originReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originReplace.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

export default VueRouter
