const ground = {
    height: 25,
    color: 'green'
};

function drawGround() {
    ctx.fillStyle = ground.color;
    ctx.fillRect(0, canvas.height - ground.height, canvas.width, ground.height);
}

function resizeCanvas() {
    main = document.querySelector('main').getBoundingClientRect();
    canvas.width = main.width;
    canvas.height = main.height;

    if (player.y + player.height > canvas.height - ground.height) {
        player.y = canvas.height - ground.height - player.height; // 更新玩家对象的Y坐标，避免超出屏幕范围
    }
    if (player_2.y + player_2.height > canvas.height - ground.height) {
        player_2.y = canvas.height - ground.height - player_2.height; // 更新玩家对象的Y坐标，避免超出屏幕范围
    }

    enemy.y = canvas.height - ground.height - enemy.height; // 更新敌人对象的Y坐标，避免超出屏幕范围
}

document.addEventListener("DOMContentLoaded", function () { 
    startGame();
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200); 
})