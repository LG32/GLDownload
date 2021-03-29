
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

export const DOWNLOAD_URL = "https://download-cf.jetbrains.com/objc/AppCode-2020.3.4.dmg"

export const ENGINE_RPC_HOST = '127.0.0.1'

export const ENGINE_RPC_PORT = 16800

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
