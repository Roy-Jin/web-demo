// 注意：该文件仅供参考，实际开发中请根据实际情况进行修改

import hljs from 'https://cdn.jsdelivr.net/npm/highlight.js@11.10.0/+esm' // 导入highlight.js库
import SEND_XHR_REQUEST from './xhr/index.js'; // 导入xhr封装模块
 
// 当点击ID为"SEND_XHR_REQUEST"的按钮时，执行此函数
document.getElementById("SEND_XHR_REQUEST").onclick = function (btn) {
    document.getElementById('XHR_PROGRESS').value = 0; // 进度条初始化
    btn.target.disabled = true; // 禁用按钮
    // 发送XHR请求
    SEND_XHR_REQUEST({
        url: './doc/xhr.js', // 请求地址 - 必须
        method: 'GET', // 请求方法 - 可选，默认GET
        async: true, // 是否异步 - 可选，默认true
        responseType: "text", // 响应类型 - 可选，默认text
        // 进度更新回调函数 - 可选
        onprogress: (event) => {
            // 进度条颜色变化、进度值更新、状态提示更新
            document.getElementById('XHR_PROGRESS').style.setProperty('--success-color', '#28a745');
            document.getElementById('XHR_PROGRESS').value = event.percent;
            document.getElementById('XHR_STATUS').innerHTML = `已加载 ${event.percent} %`;
        },
        // 加载完成回调函数 - 可选
        onload: (event) => {
            // 进度条颜色变化、状态提示更新、响应内容高亮显示、按钮启用、响应内容显示
            btn.target.disabled = false;
            const STATUS = `已成功获取到 HTTP 请求`;
            const RESPONSE = hljs.highlight(event.srcElement.responseText, { language: 'javascript' }).value;
            document.getElementById('XHR_STATUS').innerHTML = STATUS;
            document.getElementById('RESPONSE_CONTAINER').innerHTML = RESPONSE;
        },
        // 错误处理回调函数 - 可选
        onerror: (event) => {
            // 进度条颜色变化、状态提示更新、按钮启用
            btn.target.disabled = false;
            const STATUS = `${event.status} ${event.statusText}!`;
            document.getElementById('XHR_PROGRESS').style.setProperty('--success-color', '#dc3545');
            document.getElementById('XHR_STATUS').innerHTML = STATUS;
        }
    })
};