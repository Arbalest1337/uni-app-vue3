export const Toast = (title: string, options?: any) => {
    uni.showToast({
        icon: 'none',
        title,
        ...options
    })
}

export const Dialog = (options: any) => {
    return new Promise((resolve, reject) => {
        uni.showModal({
            ...options,
            success: (res: any) => {
                if (res.confirm) resolve(true)
                reject(false)
            }
        })
    })
}
