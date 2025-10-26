// 注意：该文件仅供参考，实际开发中请根据实际情况进行修改

import hljs from 'https://cdn.jsdelivr.net/npm/highlight.js@11.10.0/+esm' // 导入highlight.js库
import SEND_FETCH_REQUEST from './fetch/index.js'; // 导入fetch封装模块

// 当点击ID为"SEND_FETCH_REQUEST"的按钮时，执行此函数
document.getElementById("SEND_FETCH_REQUEST").onclick = function (btn) {
    document.getElementById('FETCH_PROGRESS').value = 0; // 进度条初始化
    btn.target.disabled = true; // 禁用按钮
    // 发送Fetch请求
    SEND_FETCH_REQUEST({
        url: './doc/fetch.js', // 请求地址 - 必须
        method: 'GET', // 请求方法 - 可选，默认GET
        headers: {}, // 请求头 - 可选，默认{}
        body: null, // 请求体 - 可选，默认null
        // 进度更新回调函数 - 可选
        onprogress: (event) => {
            // 进度条更新、状态提示更新
            document.getElementById('FETCH_PROGRESS').value = event.percent;
            document.getElementById('FETCH_STATUS').innerHTML = `已加载 ${event.percent} %`;
        },
        // 加载完成回调函数 - 可选
        onload: (event) => {
            // 进度条更新、状态提示更新、按钮启用、响应内容展示、响应内容高亮
            btn.target.disabled = false;
            const STATUS = `已成功获取到 HTTP 请求`;
            const RESPONSE = hljs.highlight(event.result, { language: 'javascript' }).value;
            document.getElementById('FETCH_STATUS').innerHTML = STATUS;
            document.getElementById('RESPONSE_CONTAINER').innerHTML = RESPONSE;
        },
        // 错误处理回调函数 - 可选
        onerror: (event) => {
            // 进度条更新、状态提示更新、按钮启用
            btn.target.disabled = false;
            const STATUS = `${event.status} ${event.statusText}!`;
            document.getElementById('FETCH_STATUS').innerHTML = STATUS;
        }
    })
};