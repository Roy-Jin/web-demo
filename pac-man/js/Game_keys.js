const keys = {};
let stopTime;

setTimeout(() => {
    document.addEventListener('keydown', function (event) {
        keys[event.key] = true;
        if (event.key === "Enter") {
            if (gameOver) {
                initialize();
            } else {
                if (stop) {
                    stopTime = setTimeout(() => {
                        stopEnemy = false;
                    }, 500);
                    stop = false;
                    songsRun('../songs/6.mp3');
                } else {
                    clearTimeout(stopTime)
                    stop = true;
                    stopEnemy = true;
                }
            }
        }
        if (event.key === ' ') {
            if (!player.jumpNum == 0) {
                player.jumpNum--;
                if (METHOD == '3') {
                    startJump('p1');
                    startJump('p2');
                } else {
                    startJump('p1');
                }
            }
        }

        if (event.code === 'Numpad0') {
            if (METHOD == '2') {
                enemy.use = !enemy.use;
            }
            else if (METHOD == '1') {
                if (!player.jumpNum == 0) {
                    player.jumpNum--;
                    startJump('p1');
                }
            }
            else {
                if (!player_2.jumpNum == 0) {
                    player_2.jumpNum--;
                    startJump('p2');
                }
            }
        }
        if (event.key === 'j') {
            if (player.score >= 10) {
                songsRun('../songs/1.mp3');
                player.jumpNum++;
                player.score -= 10;
            }
        }
        if (event.key === 'k') {
            if (player.jumpNum >= 1) {
                songsRun('../songs/2.mp3');
                player.jumpNum--;
                player.score += 10;
            }
        }
        if (event.code === 'NumpadAdd') {
            if (METHOD == '1') {
                if (player.score >= 10) {
                    songsRun('../songs/1.mp3');
                    player.jumpNum++;
                    player.score -= 10;
                }
            } else {
                if (player_2.score >= 10) {
                    songsRun('../songs/1.mp3');
                    player_2.jumpNum++;
                    player_2.score -= 10;
                }
            }


        }
        if (event.code === 'NumpadSubtract') {
            if (METHOD == '1') {
                if (player.jumpNum >= 1) {
                    songsRun('../songs/2.mp3');
                    player.jumpNum--;
                    player.score += 10;
                }
            } else {
                if (player_2.jumpNum >= 1) {
                    songsRun('../songs/2.mp3');
                    player_2.jumpNum--;
                    player_2.score += 10;
                }
            }

        }
        if (event.key === "Backspace") {
            this.location.replace('../index.html')
        }
    });

    document.addEventListener('keyup', function (event) {
        keys[event.key] = false;
    });
}, 1000);

