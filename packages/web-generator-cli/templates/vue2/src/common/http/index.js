import axios from 'axios'
// 完整性加密
import signMd5 from './sign-md5'

import store from '@/store'

import { Notification } from 'ant-design-vue'
import router from '@/router'

// axios实例
const instance = axios.create({
  timeout: process.env.VUE_APP_TIMEOUT
})

// 默认校验函数：响应类型为blob或响应数据中的success为true
function defaultValidate(resData, res) {
  return res?.config.responseType === 'blob' || resData.success === true
}

// 默认获取数据函数：响应数据为blob直接放回，其他返回响应数据中的result
function defaultExtractData(resData, res) {
  return res?.config.responseType === 'blob' ? resData : resData.result
}

/**
 * 请求接口
 * @param {*} 参数配置
 * {
    url: string, 
    method?: Method, // 'get' | 'post' | 'put' | 'delete'
    module?: 'api' | 'mock', // 使用的接口模块
    alert?: boolean, // 默认请求失败自动弹出错误提示，设置false则屏蔽
    md5?: boolean, // 使用md5进行完整性加密
    validate?: (resData, res ) => boolean // 响应数据校验函数
    extractData?: (resData, res) => any // 获取数据函数
    nativeOptions?: {} // axios的其他配置
  }
 * @returns Promise
 */

/**
 * 请求接口统一入口
 * @author jinpengh
 *
 * @param {Object} param0
 * @param {'get' | 'post' | 'delete' | 'put'} [param0.method='get']  请求方法
 * @param {Object} param0.params  query请求参数
 * @param {Object} param0.data  body请求参数
 * @param {String} param0.url  地址
 * @param {'api' | 'mock'} [param0.module='api']  接口模块
 * @param {Boolean} [param0.alert=true]  报错时弹出警告
 * @param {Boolean} [param0.md5=false]  使用md5处理参数，用于完整性校验
 * @param {Function} [param0.validate=defaultValidate]  校验函数，返回true进入then，返回false进入catch
 * @param {Function} [param0.extractData=defaultExtractData]  提取数据函数
 * @param {Object} [param0.nativeOptions={}]  支持axios的所有原始请求参数
 * @returns {Promise<any>}
 */
export default function http({
  method = 'get',
  params,
  data,
  url,
  module = 'api',
  alert = true,
  md5 = false,
  validate = defaultValidate,
  extractData = defaultExtractData,
  nativeOptions = {}
}) {
  if (!/:\/\//.test(url)) {
    url = `/${process.env.VUE_APP_NAME}/${module}/${url}`.replace(/\/\//g, '/')
  }
  const httpParams = {
    method,
    url,
    params,
    data,
    headers: {
      'X-Access-Token': store.getters.Token || ''
    },
    ...nativeOptions
  }
  if (md5) {
    if (!httpParams.headers) {
      httpParams.headers = {}
    }
    const sign = signMd5.getSign(url, method === 'get' ? params : data)
    httpParams.headers['X-Sign'] = sign
    httpParams.headers['X-TIMESTAMP'] = signMd5.getTimestamp()
  }
  return instance(httpParams)
    .then((res) => {
      // 校验通过，返回数据
      if (validate(res.data, res)) {
        return extractData(res.data, res)
      }
      // 校验失败，走catch
      return Promise.reject(res)
    })
    .catch((error) => {
      if (alert) {
        let description = '未知异常，请联系管理员'
        if ('data' in error) {
          description = error.data.message
        } else {
          description = error.message
        }
        Notification.error({
          message: '系统错误',
          description: description,
          duration: 3
        })
      }
      // 登录超时
      if (error.data.code === 401) {
        store.dispatch('logout', false)
        const redirect = location.href.replace(location.origin, '')
        router.push({ name: 'Login', query: { redirect } })
      }
      return Promise.reject(error)
    })
}
