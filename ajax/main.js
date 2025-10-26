import hljs from 'https://cdn.jsdelivr.net/npm/highlight.js@11.10.0/+esm'
import SEND_XHR_REQUEST from './xhr/index.js';
import SEND_FETCH_REQUEST from './fetch/index.js';

document.getElementById("SEND_XHR_REQUEST").onclick = function (btn) {
    document.getElementById('XHR_PROGRESS').value = 0;
    btn.target.disabled = true;
    SEND_XHR_REQUEST({
        url: './doc/xhr.js',
        onprogress: (event) => {
            document.getElementById('XHR_PROGRESS').style.setProperty('--success-color', '#28a745');
            document.getElementById('XHR_PROGRESS').value = event.percent;
            document.getElementById('XHR_STATUS').innerHTML = `<info>已加载 ${event.percent} %</info>`;
        },
        onload: (event) => {
            btn.target.disabled = false;
            const STATUS = `<success>已成功获取到 HTTP 请求</success>`;
            const RESPONSE = hljs.highlight(event.target.responseText, { language: 'javascript' }).value;
            document.getElementById('XHR_STATUS').innerHTML = STATUS;
            document.getElementById('RESPONSE_CONTAINER').innerHTML = RESPONSE;
        },
        onerror: (event) => {
            btn.target.disabled = false;
            const STATUS = `<danger>${event.status} ${event.statusText}!</danger>`;
            document.getElementById('XHR_PROGRESS').style.setProperty('--success-color', '#dc3545');
            document.getElementById('XHR_STATUS').innerHTML = STATUS;
        }
    })
};

document.getElementById("SEND_FETCH_REQUEST").onclick = function (btn) {
    document.getElementById('FETCH_PROGRESS').value = 0;
    btn.target.disabled = true;
    SEND_FETCH_REQUEST({
        url: './doc/fetch.js',
        onprogress: (event) => {
            document.getElementById('FETCH_PROGRESS').value = event.percent;
            document.getElementById('FETCH_STATUS').innerHTML = `<info>已加载 ${event.percent} %</info>`;
        },
        onload: (event) => {
            btn.target.disabled = false;
            const STATUS = `<success>已成功获取到 HTTP 请求</success>`;
            const RESPONSE = hljs.highlight(event.result, { language: 'javascript' }).value;
            document.getElementById('FETCH_STATUS').innerHTML = STATUS;
            document.getElementById('RESPONSE_CONTAINER').innerHTML = RESPONSE;
        },
        onerror: (event) => {
            btn.target.disabled = false;
            const STATUS = `<danger>${event.status} ${event.statusText}!</danger>`;
            document.getElementById('FETCH_STATUS').innerHTML = STATUS;
        }
    })
};

document.getElementById("SEND_TEST_REQUEST").onclick = function (btn) {
    document.getElementById('TEST_PROGRESS').value = 0;
    btn.target.disabled = true;
    SEND_XHR_REQUEST({
        url: './doc/img.png',
        responseType: 'blob', // 设置为二进制流
        onprogress: (event) => {
            document.getElementById('TEST_PROGRESS').style.setProperty('--success-color', '#28a745');
            document.getElementById('TEST_PROGRESS').value = event.percent;
            document.getElementById('TEST_IMAGE').style.opacity = 0.5 + event.percent / 200;
            document.getElementById('TEST_STATUS').innerHTML = `<info>已加载 ${event.percent} %</info>`;
        },
        onload: (event) => {
            btn.target.disabled = false;
            const STATUS = `<success>已成功获取到 HTTP 请求<br/><small>因为浏览器渲染图片需要时间，所以显示图片会有延迟</small></success>`;
            document.getElementById('TEST_STATUS').innerHTML = STATUS;
            document.getElementById('TEST_IMAGE').src = URL.createObjectURL(new Blob([event.target.response], { type: 'image/png' }));
            document.getElementById('TEST_IMAGE').style.border = '1px solid var(--success-color)';
        },
        onerror: (event) => {
            btn.target.disabled = false;
            const STATUS = `<danger>${event.status} ${event.statusText}!</danger>`;
            document.getElementById('TEST_PROGRESS').style.setProperty('--success-color', '#dc3545');
            document.getElementById('TEST_STATUS').innerHTML = STATUS;
        }
    })
};

// 当图片加载完成后，触发动画效果
document.getElementById("TEST_IMAGE").addEventListener('load', () => {
    document.getElementById('TEST_IMAGE').style.animation = 'scale 0.3s ease-in-out forwards';
});