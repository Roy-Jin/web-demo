function gameLoop() {
    scoreAll = document.querySelectorAll('#score');
    jumpNumAll = document.querySelectorAll('#jumpNum');
    jumpNum_2All = document.querySelectorAll('#jumpNum_2');
    for (var i = 0; i < scoreAll.length; i++) { scoreAll[i].innerHTML = player.score; }
    for (var i = 0; i < jumpNumAll.length; i++) { jumpNumAll[i].innerHTML = player.jumpNum; }
    for (var i = 0; i < jumpNum_2All.length; i++) { jumpNum_2All[i].innerHTML = player_2.jumpNum; }
    document.querySelector('#score_2').innerHTML = player_2.score;
    document.querySelector('#jumpNum_2').innerHTML = player_2.jumpNum;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#555';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (METHOD == '1' || METHOD == '2') {
        if (!stop) {
            if (!player.over) {
                updatePlayer();
                updateBean();
                updateBigBean();
            }
        }
        drawPlayer();
    } else {
        if (!stop) {
            if (!player_2.over) {
                updatePlayer_2();
            }
            if (!player.over) {
                updatePlayer();
            }
            updateBean();
            updateBigBean();
        }
        drawPlayer_2();
        drawPlayer();
    }


    if (!stopEnemy) {
        updateEnemy();
    }

    drawGround();
    drawBean();
    drawBigBean();
    drawEnemy();

    checkCollision();

    if (gameOver) {
        endGame();
        document.querySelector('#MODE').disabled = false;
        document.querySelector('#scoreDiv').classList.add("b");
    } else {
        requestAnimationFrame(gameLoop);
        document.querySelector('#MODE').disabled = true;
        document.querySelector('#scoreDiv').classList.remove("b");
    }
}