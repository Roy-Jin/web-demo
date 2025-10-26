import CmdJs from './cmdJs.js';

// 监听右键菜单事件
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
})

// 输出函数
window.Output = function (text) {
    const outputDiv = document.createElement('div');
    outputDiv.innerHTML = text;
    document.getElementById('Output').appendChild(outputDiv);
    outputDiv.scrollIntoView();
}

// 监听cmdJS输入框回车事件
document.getElementById('Input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const inputValue = document.getElementById('Input').value;
        document.getElementById('Input').value = '';
        if (inputValue.trim() === '') return;
        const output = CmdJs.execute(inputValue);
        window.Output(output);
    }
});

// 监听cmdJS输入框聚焦事件
document.addEventListener('keydown', () => {
    document.getElementById('Input').focus();
})