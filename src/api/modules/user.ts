import request from '@/api/request'
export default {
    // 登录
    login: (data: any) =>
        request({
            url: '/login',
            method: 'post',
            data,
            needToken: false
        }),

    // 用户信息
    info: () =>
        request({
            url: '/info',
            method: 'get'
        })
}
