/**
 * XMLHttpRequest 请求封装
 * @param {object} options 
 * @param {string} options.url 请求地址
 * @param {string} [options.method='GET'] 请求方式
 * @param {object} [options.responseType] 响应类型
 * @param {boolean} [options.async=true] 是否异步请求
 * @param {function} [options.onload] 请求成功回调函数
 * @param {function} [options.onerror] 请求失败回调函数
 * @param {function} [options.onprogress] 请求进度回调函数
 * @returns {XMLHttpRequest}
 */
export default function (options) {
    // 合并默认参数
    const defaults = {
        method: 'GET',
        async: true,
        responseType: 'text',
    };
    options = { ...defaults, ...options };
    if (!options.url) {
        throw new Error('No URL specified!');
    }

    // 首先，创建一个 XMLHttpRequest 对象
    const xhr = new XMLHttpRequest();

    // 然后，设置请求的 URL 和请求方式。
    xhr.open(options.method, options.url, options.async);
    
    // 设置响应类型
    options.responseType && (xhr.responseType = options.responseType);

    // 注册错误事件处理函数
    options.onerror && (xhr.onerror = (event) => {
        options.onerror(event.target);
    });

    // 注册成功事件处理函数
    options.onload && (xhr.onload = (event) => {
        if (xhr.status >= 200 && xhr.status < 300) {
            options.onload(event);
        } else {
            options.onerror && options.onerror(event.target);
        }
    });

    // 注册进度事件处理函数
    options.onprogress && (xhr.onprogress = (event) => {
        event.percent = ((event.loaded / event.total) * 100).toFixed(2);
        options.onprogress(event);
    });

    // 发送请求
    xhr.send();
    return xhr;
}