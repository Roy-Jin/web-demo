const player = {
    x: 100,
    y: 600,
    width: 50,
    height: 80,
    speed: 12,
    src: '../imgs/p1.png',
    isJumping: false,
    jumpTime: 25,
    downTime: 0,
    jumpNum: 3,
    over: false,
    score: 0
};

const player_2 = {
    x: 100,
    y: 600,
    width: 50,
    height: 80,
    speed: 12,
    src: '../imgs/p2.png',
    isJumping: false,
    jumpTime: 25,
    downTime: 0,
    jumpNum: 3,
    over: false,
    score: 0
};

function updatePlayer() {
    if (player.isJumping) {
        if (player.jumpTime <= 0) {
            player.isJumping = false;
        }
        player.jumpTime--;
        player.y -= player.jumpTime;
        player.downTime = 0;
    } else if (player.y + player.height <= (canvas.height - ground.height)) {
        if (player.downTime >= 30) {
            player.y += 12;
        } else {
            player.downTime++;
            player.y += player.downTime;
        }
        player.jumpTime = 25;
    }

    if (player.y + player.height == (canvas.height - ground.height) + 10 || player.y + player.height == (canvas.height - ground.height) - 10) {
        player.downTime = 0;
    }

    if (keys['w']) {
        if (!player.isJumping && player.y + player.height >= (canvas.height - ground.height)) {
            startJump('p1');
        }
        else if ((player.y + player.height) <= player_2.y + 30 && (player.y + player.height) >= player_2.y - 30 && player.x <= (player_2.x + player_2.width) && (player.x + player.width) >= player_2.x) {
            startJump('p1');
        }
    }
    if (keys['a']) {
        if (player.x > 0) {
            player.x -= player.speed;
        }
    }
    if (keys['d']) {
        if (player.x + player.width < canvas.width) {
            player.x += player.speed;
        }
    }
    if (METHOD == '1') {
        if (keys['ArrowUp']) {
            if (!player.isJumping && player.y + player.height >= (canvas.height - ground.height)) {
                startJump('p1');
            }
        }
        if (keys['ArrowLeft']) {
            if (player.x > 0) {
                player.x -= player.speed;
            }
        }
        if (keys['ArrowRight']) {
            if (player.x + player.width < canvas.width) {
                player.x += player.speed;
            }
        }
    }
}

function updatePlayer_2() {
    if (player_2.isJumping) {
        if (player_2.jumpTime <= 0) {
            player_2.isJumping = false;
        }
        player_2.jumpTime--;
        player_2.y -= player_2.jumpTime;
        player_2.downTime = 0;
    } else if (player_2.y + player_2.height <= (canvas.height - ground.height)) {
        if (player_2.downTime >= 30) {
            player_2.y += 12;
        } else {
            player_2.downTime++;
            player_2.y += player_2.downTime;
        }
        player_2.jumpTime = 25;
    }

    if (player_2.y + player_2.height == (canvas.height - ground.height) + 10 || player_2.y + player_2.height == (canvas.height - ground.height) - 10) {
        player_2.downTime = 0;
    }

    if (keys['ArrowUp']) {
        if (!player_2.isJumping && player_2.y + player_2.height >= (canvas.height - ground.height)) {
            startJump('p2');
        }
        else if ((player_2.y + player_2.height) <= player.y + 30 && (player_2.y + player_2.height) >= player.y - 30 && player_2.x <= (player.x + player.width) && (player_2.x + player_2.width) >= player.x) {
            startJump('p2');
        }
    }
    if (keys['ArrowLeft']) {
        if (player_2.x > 0) {
            player_2.x -= player_2.speed;
        }
    }
    if (keys['ArrowRight']) {
        if (player_2.x + player_2.width < canvas.width) {
            player_2.x += player_2.speed;
        }
    }
}

function drawPlayer() {
    // 创建一个临时的canvas作为中间层
    var tempCanvas = document.createElement('canvas');
    var tempCtx = tempCanvas.getContext('2d');
    // 设置临时canvas的尺寸与玩家角色的尺寸相同
    tempCanvas.width = player.width;
    tempCanvas.height = player.height;
    // 在临时canvas上绘制圆角矩形
    var radius = Math.min(player.width, player.height) / 2.5;
    tempCtx.beginPath();
    tempCtx.moveTo(radius, 0);
    tempCtx.lineTo(player.width - radius, 0);
    tempCtx.arcTo(player.width, 0, player.width, radius, radius);
    tempCtx.lineTo(player.width, player.height - radius);
    tempCtx.arcTo(player.width, player.height, player.width - radius, player.height, radius);
    tempCtx.lineTo(radius, player.height);
    tempCtx.arcTo(0, player.height, 0, player.height - radius, radius);
    tempCtx.lineTo(0, radius);
    tempCtx.arcTo(0, 0, radius, 0, radius);
    tempCtx.closePath();
    tempCtx.clip();
    // 在临时canvas上绘制玩家角色的纹理图像
    var textureImage = new Image();
    textureImage.src = player.src;
    tempCtx.drawImage(textureImage, 0, 0, player.width, player.height);
    // 将临时canvas绘制到主canvas上
    ctx.drawImage(tempCanvas, player.x, player.y);
}

function drawPlayer_2() {
    // 创建一个临时的canvas作为中间层
    var tempCanvas = document.createElement('canvas');
    var tempCtx = tempCanvas.getContext('2d');
    // 设置临时canvas的尺寸与玩家角色的尺寸相同
    tempCanvas.width = player_2.width;
    tempCanvas.height = player_2.height;
    // 在临时canvas上绘制圆角矩形
    var radius = Math.min(player_2.width, player_2.height) / 2.5;
    tempCtx.beginPath();
    tempCtx.moveTo(radius, 0);
    tempCtx.lineTo(player_2.width - radius, 0);
    tempCtx.arcTo(player_2.width, 0, player_2.width, radius, radius);
    tempCtx.lineTo(player_2.width, player_2.height - radius);
    tempCtx.arcTo(player_2.width, player_2.height, player_2.width - radius, player_2.height, radius);
    tempCtx.lineTo(radius, player_2.height);
    tempCtx.arcTo(0, player_2.height, 0, player_2.height - radius, radius);
    tempCtx.lineTo(0, radius);
    tempCtx.arcTo(0, 0, radius, 0, radius);
    tempCtx.closePath();
    tempCtx.clip();
    // 在临时canvas上绘制玩家角色的纹理图像
    var textureImage = new Image();
    textureImage.src = player_2.src;
    tempCtx.drawImage(textureImage, 0, 0, player_2.width, player_2.height);
    // 将临时canvas绘制到主canvas上
    ctx.drawImage(tempCanvas, player_2.x, player_2.y);
}

function startJump(playID) {
    songsRun('../songs/4.mp3', Volume + 0.4);
    switch (playID) {
        case 'p1':
            player.isJumping = true;
            player.jumpTime = 25;
            break;
        case 'p2':
            player_2.isJumping = true;
            player_2.jumpTime = 25;
            break;
    }
}