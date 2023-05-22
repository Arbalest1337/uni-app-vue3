import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import uviewPlus from 'uview-plus'
import App from './App.vue'

export function createApp() {
    const app = createSSRApp(App).use(createPinia()).use(uviewPlus)
    ;(uni as any).$u.setConfig({
        config: {
            unit: 'rpx'
        }
    })

    return {
        app
    }
}
