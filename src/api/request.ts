import axios from 'axios'
import type {
    AxiosRequestConfig,
    AxiosRequestHeaders,
    InternalAxiosRequestConfig,
    Canceler
} from 'axios'
import config, { TOKEN_KEY } from '@/config'
import { camelToSnake, snakeToCamel } from '@/utils/transfer'
import { useUserStore } from '@/store/user'
import { Toast, Dialog } from '@/utils'
const userStore = useUserStore()

// 取消请求
const cancelerMap = new Map<string, Canceler>()
const createCanceler = (config: AxiosRequestConfig) => {
    return new axios.CancelToken(cancel => {
        const flag = `${config.method}&${config.url}`
        cancelerMap.set(flag, cancel)
    })
}
const removeAllCanceler = () => {
    cancelerMap.forEach(item => item())
    cancelerMap.clear()
}

// 错误处理
const errorHandle = (code: number, message: string) => {
    if ([401, 403].includes(code)) {
        removeAllCanceler()
        userStore.logout()
        Dialog({
            title: '登录失效',
            content: '登录失效，请重新登录',
            showCancel: false
        }).finally(() => {
            uni.reLaunch({ url: 'login' })
        })
    } else {
        Toast(message || '请求失败，请检查网络')
    }
}

// 实例
interface RequestExtraConfig extends AxiosRequestConfig {
    needToken?: boolean
    paramsTransform?: boolean
    resultTransform?: boolean
}

const request = (cfg: RequestExtraConfig) => {
    const extraConfig = {
        needToken: true,
        paramsTransform: true,
        resultTransform: true,
        ...cfg
    }

    // 全局配置
    const service = axios.create({
        baseURL: config.baseUrl,
        timeout: 15000
    })

    // 请求拦截
    service.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            config.cancelToken = createCanceler(config)
            if (extraConfig.needToken) {
                config.headers = {
                    ...config.headers,
                    [TOKEN_KEY]: userStore.token
                } as AxiosRequestHeaders
            }
            if (extraConfig.paramsTransform) {
                config.data = camelToSnake(config.data)
                config.params = camelToSnake(config.params)
            }
            return config
        },
        error => {
            console.log(error)
            return Promise.reject(error)
        }
    )

    // 响应拦截
    service.interceptors.response.use(
        response => {
            const { 'content-type': contentType } = response.headers
            if (contentType.indexOf('json') !== -1) {
                const { success, code, data, message } = response.data
                if (!success) {
                    errorHandle(code, message)
                    return Promise.reject(response.data)
                }
                return Promise.resolve(extraConfig.resultTransform ? snakeToCamel(data) : data)
            } else {
                const { data } = response
                return Promise.resolve({
                    success: true,
                    message: 'other response',
                    data: data
                })
            }
        },
        error => {
            const { response } = error
            if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
                errorHandle(408, '请求超时')
            } else if (response) {
                // 请求成功，但不在 2xx范围内
                const { status, data } = response
                errorHandle(status, data.message)
            }
            return Promise.reject(error)
        }
    )
    return service(cfg)
}

export default request
