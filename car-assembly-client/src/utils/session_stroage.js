/**
 * 封装sessionStorage
 */

export function setSession(key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }

    sessionStorage.setItem(key, value);
}

export function getSession(key) {
    let value = sessionStorage.getItem(key);

    if (typeof value === 'string') {
        value = JSON.parse(value);
    }

    return value;
}
