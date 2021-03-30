
import {
    camelCase,
    compact,
    difference,
    isArray,
    isEmpty,
    isFunction,
    isNaN,
    kebabCase,
    omitBy,
    parseInt,
    pick
} from 'lodash'

export const TASK_STATUS = {
    ACTIVE: 'active',
    WAITING: 'waiting',
    PAUSED: 'paused',
    ERROR: 'error',
    COMPLETE: 'complete',
    REMOVED: 'removed',
    SEEDING: 'seeding'
}

export const DOWNLOAD_URL = "http://qaipa.ijunhai.com:8080/up/%E9%BB%8E%E6%98%8E%E8%88%AA%E7%BA%BFBT2_%E6%B8%B8%E6%88%8FFAN_%E6%96%B0__5.8_202103301529.apk"

export const ENGINE_RPC_HOST = '127.0.0.1'

export const ENGINE_RPC_PORT = 6800

export const APP_ICON = ""

export const APP_BACKGROUND = ""

export function compactUndefined (arr = []) {
    return arr.filter((item) => {
        return item !== undefined
    })
}

export function formatOptionsForEngine (options) {
    const result = {}

    Object.keys(options).forEach((key) => {
        const kebabCaseKey = kebabCase(key)
        result[kebabCaseKey] = `${options[key]}`
    })

    return result
}

export function mergeTaskResult (response = []) {
    let result = []
    for (const res of response) {
        result = result.concat(...res)
    }
    return result
}

export function changeKeysToCamelCase (obj) {
    return changeKeysCase(obj, camelCase)
}

export function changeKeysCase (obj, caseConverter) {
    const result = {}
    if (isEmpty(obj) || !isFunction(caseConverter)) {
        return result
    }

    for (const [k, value] of Object.entries(obj)) {
        const key = caseConverter(k)
        result[key] = value
    }

    return result
}

export function changeKeysToKebabCase (obj) {
    return changeKeysCase(obj, kebabCase)
}

export const intersection = (array1 = [], array2 = []) => {
    if (array1.length === 0 || array2.length === 0) {
        return []
    }

    return array1.filter(value => array2.includes(value))
}

export const bytesToSize = (bytes) => {
    const b = parseInt(bytes, 10)
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    if (b === 0) { return '0 KB' }
    const i = parseInt(Math.floor(Math.log(b) / Math.log(1024)), 10)
    if (i === 0) { return `${b} ${sizes[i]}` }
    return `${(b / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}
