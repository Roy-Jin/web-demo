const enemy = {
    x: canvas.width,
    y: canvas.height - ground.height - 25,
    width: 40,
    height: 60,
    speed: 12,
    use: false,
    Aleft: true
};

function drawEnemy() {
    ctx.fillStyle = "red";
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

function updateEnemy() {
    if (MODE == 'Easy') { speed = 12 } else if (MODE == 'Normal') { speed = 16 } else { speed = 24 }
    if (!enemy.use) {
        if (enemy.Aleft) {
            if (enemy.x > 0) {
                enemy.x -= speed;
            }
        } else {
            if (enemy.x + enemy.width < canvas.width) {
                enemy.x += speed;
            }
        }
    }

    if (METHOD == '2') {
        if (keys['ArrowLeft']) {
            if (enemy.use) {
                if (enemy.x > 0) {
                    enemy.x -= speed;
                }
            }
            enemy.Aleft = true;
        }
        if (keys['ArrowRight']) {
            if (enemy.use) {
                if (enemy.x + enemy.width < canvas.width) {
                    enemy.x += speed;
                }
            }
            enemy.Aleft = false;
        }
    }

    if (enemy.x <= 0 || enemy.x + enemy.width >= canvas.width) {
        enemy.Aleft = !enemy.Aleft;
    }
}
