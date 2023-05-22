import { camelCase, snakeCase, map } from 'lodash-es'

// 下划线转驼峰
export const snakeToCamel = (o: any): any => {
    if (o === null || typeof o !== 'object') return o

    if (Array.isArray(o)) {
        return map(o, snakeToCamel)
    }

    const obj: any = {}
    for (const key in o) {
        if (Object.prototype.hasOwnProperty.call(o, key)) {
            const e = o[key]
            const newKey: string = camelCase(key)
            if (e === null || typeof e !== 'object') {
                obj[newKey] = e
            } else {
                obj[newKey] = snakeToCamel(e)
            }
        }
    }
    return obj
}

// 驼峰转下划线
export const camelToSnake = (o: any): any => {
    if (o === null || typeof o !== 'object') return o

    if (Array.isArray(o)) {
        return map(o, camelToSnake)
    }

    const obj: any = {}
    for (const key in o) {
        if (Object.prototype.hasOwnProperty.call(o, key)) {
            const e = o[key]
            const newKey: string = snakeCase(key)
            if (e === null || typeof e !== 'object' || Array.isArray(e)) {
                obj[newKey] = e
            } else {
                obj[newKey] = camelToSnake(e)
            }
        }
    }
    return obj
}
