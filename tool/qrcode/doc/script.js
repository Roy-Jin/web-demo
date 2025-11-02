document.addEventListener('DOMContentLoaded', function () {
    // 获取DOM元素
    const qrText = document.getElementById('qr-text');
    const qrSize = document.getElementById('qr-size');
    const qrColor = document.getElementById('qr-color');
    const qrBgColor = document.getElementById('qr-bgcolor');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const qrcodeContainer = document.getElementById('qrcode');
    const modal = document.getElementById('modal');
    const modalQrcode = document.getElementById('modal-qrcode');
    const closeModal = document.getElementById('close-modal');

    let qrcode = null;

    // 生成二维码函数
    function generateQRCode() {
        const text = qrText.value.trim();
        if (!text) {
            alert('请输入要生成二维码的文本或URL');
            return;
        }

        // 清除之前的二维码
        qrcodeContainer.innerHTML = '';

        // 创建新的二维码
        qrcode = new QRCode(qrcodeContainer, {
            text: text,
            width: parseInt(qrSize.value),
            height: parseInt(qrSize.value),
            colorDark: qrColor.value,
            colorLight: qrBgColor.value,
            correctLevel: QRCode.CorrectLevel.H
        });

        // 更新提示文本
        const hint = document.querySelector('.hint');
        if (hint) {
            hint.textContent = '二维码已生成';
        }
    }

    // 下载二维码函数
    function downloadQRCode() {
        if (!qrcode) {
            alert('请先生成二维码');
            return;
        }

        const canvas = qrcodeContainer.querySelector('canvas');
        if (!canvas) {
            alert('无法获取二维码图像');
            return;
        }

        // 创建下载链接
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    // 全屏显示二维码
    function showFullscreenQRCode() {
        if (!qrcode) {
            alert('请先生成二维码');
            return;
        }

        // 清除模态框中的二维码
        modalQrcode.innerHTML = '';

        // 创建新的二维码（更大尺寸）
        const text = qrText.value.trim();
        new QRCode(modalQrcode, {
            text: text,
            width: 400,
            height: 400,
            colorDark: qrColor.value,
            colorLight: qrBgColor.value,
            correctLevel: QRCode.CorrectLevel.H
        });

        // 显示模态框
        modal.style.display = 'flex';
    }

    // 事件监听
    generateBtn.addEventListener('click', generateQRCode);
    downloadBtn.addEventListener('click', downloadQRCode);
    fullscreenBtn.addEventListener('click', showFullscreenQRCode);
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // 点击模态框背景关闭
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 初始生成一个二维码
    generateQRCode();
});