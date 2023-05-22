import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
    const token = useStorage('access_token', '')

    const login = async (_formData: Record<string, any>) => {
        token.value = `Bearer ${'this is test Token!'}`
    }

    const logout = () => {
        token.value = null
    }

    return {
        token,
        login,
        logout
    }
})
