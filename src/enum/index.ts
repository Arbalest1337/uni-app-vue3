// enum to select options
export const enumToOptions = (v: Record<string, any>, isNumberEnum = true) => {
    const options = Object.keys(v).map(key => ({ label: key, value: v[key] }))
    return isNumberEnum ? options.filter(item => typeof item.value === 'number') : options
}
