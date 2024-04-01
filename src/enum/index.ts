// enum to select options
export const enumToOptions = (v: Record<string, any>, isNumberEnum = true) =>
    Object.keys(v)
        .filter(key => !/[\u4e00-\u9fa5]/.test(v[key]))
        .map(key => ({
            label: key,
            value: isNumberEnum ? Number(v[key]) : v[key]
        }))

import * as Common from './modules/common'

export default {
    Common
}
