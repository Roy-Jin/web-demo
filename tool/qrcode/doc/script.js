const pragma = new URLSearchParams(window.location.search);

function Title(_html, _style) {
    try { document.getElementById("LOG").remove(); } catch { }
    var log = document.createElement("p");
    log.id = "LOG";
    log.innerHTML = _html ? _html : "";
    log.style = _style;
    setTimeout(() => {
        qrcodeElement.append(log);
    }, 11);
}
document.body.style.background = pragma.get("bg") ? pragma.get("bg") : "#333";
var qrcodeElement = document.getElementById("qrcode");
var text;
var color = pragma.get("color") ? pragma.get("color") : "rgba(221,221,221,.88)";
var errColor = "rgba(250,50,50,.75)"
if (pragma.get("text")) { text = pragma.get("text") } else { text = "QRCode: Params Error!"; color = errColor; Title("错误：还没有参数哦~", `color:${errColor}`) }

Title(pragma.get("title") ? pragma.get("title") : pragma.get("text"), `color:${color}`);

var qrcode = new QRCode(qrcodeElement, {
    text: text,
    width: 512,
    height: 512,
    colorDark: color,
    colorLight: "transparent",
    correctLevel: QRCode.CorrectLevel.H
});

setTimeout(() => {
    qrcodeElement.style.opacity = 1;
    qrcodeElement.style.transform = "rotate(0deg) scale(1)";
}, 100);

// 下载
function Down() { download(document.querySelector("img").src, document.getElementById("LOG").innerText + ".png") }

// qrcode._htOption; // the QRCode option json
// qrcode.clear(); // clear the code.
// qrcode.makeCode("TEXT"); // make another code.