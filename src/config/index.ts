const env = import.meta.env.MODE === 'production' ? 'prod' : 'dev'
console.log('env: ', env)

const envConfig = {
    dev: {
        baseUrl: '/dev-api'
    },
    prod: {
        baseUrl: '/prod-api'
    }
}

export const TOKEN_KEY = 'Authorization'

export default {
    ...envConfig[env]
}
