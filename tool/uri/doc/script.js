const pragma = new URLSearchParams(window.location.search)

if (pragma.get('to')) {
    document.getElementById('input').value = pragma.get('to');
    document.getElementById('input').disabled = true;
    document.getElementById('input').style.backgroundColor = '#bbb';
    if (pragma.get('i') == 't' || pragma.get('i') == 'true') {
        document.getElementById('input').disabled = false;
        document.getElementById('input').style.backgroundColor = '#e4d0aa';
    }
}

function decode() {
    const text = document.getElementById('textarea').value;
    const input = document.getElementById('input').value;
    let result = decodeURIComponent(text);
    if (text.trim() === '') {
        document.getElementById('textarea').value = '';
        return;
    } else if (input.trim() !== '') {
        result = input + result;
    }
    document.getElementById('result').textContent = result;
}

function encode() {
    const text = document.getElementById('textarea').value;
    const input = document.getElementById('input').value;
    let result = encodeURIComponent(text);
    if (text.trim() === '') {
        document.getElementById('textarea').value = '';
        return;
    } else if (input.trim() !== '') {
        result = input + result;
    }
    document.getElementById('result').textContent = result;
}

function copyResult() {
    let resultText = document.getElementById('result').textContent;
    if (resultText.trim() === '' || resultText === '解码/编码 结果：') {
        return;
    }
    navigator.clipboard.writeText(resultText).then(function () {
        log('已复制到剪贴板', '#d4ffce');
    }, function () {
        log('复制失败', '#f59292');
    });
}

let logTimeout;
function log(Content, bg) {
    clearTimeout(logTimeout);
    document.getElementById('log').innerHTML = Content;
    if (bg) { document.getElementById('log').style.backgroundColor = bg; }
    else { document.getElementById('log').style.backgroundColor = '#fff'; }
    logTimeout = setTimeout("document.getElementById('log').innerHTML = ''", 2500)
}

let qrcode = new QRCode(document.getElementById("qrcode"),{
    text: "",
    width: 512,
    height: 512,
    colorDark: "#eee",
    colorLight: "transparent",
    correctLevel: QRCode.CorrectLevel.H
})
function QR() {
    let resultText = document.getElementById('result').textContent;
    if (resultText.trim() === '' || resultText === '解码/编码 结果：') {
        return;
    }
    document.getElementById("qrcode").style.display = "block";
    qrcode.makeCode(resultText);
}