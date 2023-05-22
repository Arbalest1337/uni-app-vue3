import { defineConfig } from 'vite'
import { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        uni(),
        AutoImport({
            imports: ['vue'],
            dts: 'types/components.d.ts'
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },

    server: {
        host: '0.0.0.0',
        port: 8080,
        open: true,
        proxy: {
            '/api': {
                target: '',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    }
})
