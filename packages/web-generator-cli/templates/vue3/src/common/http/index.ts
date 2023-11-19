import axios, {
  type AxiosError,
  type AxiosResponse,
  type Method,
  type InternalAxiosRequestConfig,
  AxiosHeaders
} from 'axios'
import { useRouter } from 'vue-router'

// 完整性加密
import signMd5 from './sign-md5'

import { notificationApi } from '@/components/notification'
import { useAuthStore } from '@/stores/auth'

// axios实例
const instance = axios.create({
  timeout: import.meta.env.VITE_APP_TIME_OUT
})

// 响应数据格式
interface ResponseData<T = any> {
  code: number
  message: string
  result: T
  success: boolean
}

// 将部分属性可选
type PartialPart<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

interface Config<T> extends PartialPart<InternalAxiosRequestConfig, 'headers'> {
  url: string
  method?: Method
  module?: 'api' | 'mock' // 使用的接口模块
  alert?: boolean // 默认请求失败自动弹出错误提示，设置false则屏蔽
  md5?: boolean // 使用md5进行完整性加密
  validate?: (resData: ResponseData<T>, res?: AxiosResponse<ResponseData<T>>) => boolean // 响应数据校验函数
  extractData?: (resData: ResponseData<T>, res?: AxiosResponse<ResponseData<T>>) => T // 获取数据函数
  nativeOptions?: Partial<InternalAxiosRequestConfig> // axios的其他配置
}

// 默认校验函数：响应类型为blob或响应数据中的success为true
function defaultValidate<T>(
  resData: ResponseData<T>,
  res?: AxiosResponse<ResponseData<T>>
): boolean {
  return res?.config.responseType === 'blob' || resData.success === true
}

// 默认获取数据函数：响应数据为blob直接放回，其他返回响应数据中的result
function defaultExtractData<T>(resData: ResponseData<T>, res?: AxiosResponse<ResponseData<T>>): T {
  return res?.config.responseType === 'blob' ? (resData as any) : resData.result
}

export default function http<T = any>({
  method = 'get',
  params,
  data,
  url,
  module = 'api',
  alert = true,
  md5 = false,
  validate = defaultValidate<T>,
  extractData = defaultExtractData<T>,
  nativeOptions = {}
}: Config<T>): Promise<T> {
  if (!/:\/\//.test(url)) {
    url = `/${import.meta.env.VITE_APP_CODE}/${module}/${url}`.replace(/\/\//g, '/')
  }
  const httpParams = {
    method,
    url,
    params,
    data,
    ...nativeOptions
  }
  if (!httpParams.headers) {
    httpParams.headers = new AxiosHeaders()
  }

  // 添加token
  const authStore = useAuthStore()
  httpParams.headers.set('X-Access-Token', authStore.token)

  if (md5) {
    const sign = signMd5.getSign(url, method === 'get' ? params : data)
    httpParams.headers.set('X-Sign', sign)
    httpParams.headers.set('X-TIMESTAMP', signMd5.getTimestamp())
  }

  return instance(httpParams)
    .then((res: AxiosResponse<ResponseData>) => {
      // 校验通过，返回数据
      if (validate(res.data, res)) {
        return extractData(res.data, res)
      }
      // 校验失败，走catch
      return Promise.reject(res)
    })
    .catch((error: AxiosResponse<ResponseData> | AxiosError<ResponseData>) => {
      if (alert) {
        let description: string = '未知异常，请联系管理员'
        if ('data' in error) {
          description = error.data.message
        } else {
          description = error.message
        }
        notificationApi.error({
          message: '系统错误',
          description: description,
          duration: 3
        })
      }
      if ('data' in error && error.data.code === 401) {
        authStore.logout(false)
        const redirect = location.href.replace(location.origin, '')
        const router = useRouter()
        router.push({ name: 'Login', query: { redirect } })
      }
      return Promise.reject(error)
    })
}
