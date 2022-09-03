export const arrayToStringTransformer = (arr) => {
    if (typeof arr === 'string') {
        return arr;
    }
    let str = '';
    for (let i = 0; i < arr.length; i++) {
        if (str) str = str + ",";
        str = str + arr[i];
    }
    return str;
}