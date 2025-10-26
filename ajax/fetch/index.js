/**
 * fetch 请求封装
 * @param {Object} options 
 * @param {string} options.url 请求地址
 * @param {string} [options.method='GET'] 请求方法
 * @param {Object} [options.headers={}] 请求头
 * @param {string|ArrayBuffer|Blob|FormData} [options.body=null] 请求体
 * @param {function} [options.onload] 请求成功回调
 * @param {function} [options.onerror] 请求失败回调
 * @param {function} [options.onprogress] 请求进度回调
 * @returns {Promise}
 */
export default function (options) {
    // 合并默认参数
    const defaults = {
        method: 'GET',
        headers: {},
        body: null,
    };
    options = { ...defaults, ...options };
    if (!options.url) {
        throw new Error('No URL specified!');
    }

    return new Promise(async (resolve, reject) => {
        try {
            const resp = await fetch(options.url, {
                method: options.method,
                headers: options.headers,
                body: options.body,
            });

            if (!resp.ok) {
                options.onerror && options.onerror(resp);
                return;
            }

            const reader = resp.body.getReader();
            const total = +resp.headers.get('Content-Length');
            let loaded = 0;
            let chunks = [];

            while (1) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                chunks.push(value);
                loaded += value.length;
                if (options.onprogress) {
                    const percent = (loaded / total * 100).toFixed(2);
                    options.onprogress({ ...resp, loaded, total, percent, chunks });
                }
            }

            let chunksAll = new Uint8Array(loaded);
            let position = 0;
            for (let chunk of chunks) {
                chunksAll.set(chunk, position);
                position += chunk.length;
            }

            let result = new TextDecoder("utf-8").decode(chunksAll);
            options.onload && options.onload({ result, ...resp });
            resolve(result);
        } catch (error) {
            options.onerror && options.onerror(error);
            reject(error);
        }
    });
}