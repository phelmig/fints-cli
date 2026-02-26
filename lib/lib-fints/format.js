export function finTsEncode(value) {
    return value.replace(/([?:+'@])/g, '?$1');
}
export function finTsDecode(value) {
    return value.replace(/\?([?:+'@])/g, '$1');
}
