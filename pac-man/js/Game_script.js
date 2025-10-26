var params = new URLSearchParams(window.location.search);
let MODE = 'Normal';
let METHOD;
let stop = true;
let stopEnemy = true;
let gameOver = true;
let gamePlayerNum = 2;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let Text = "Press Enter to start!";

if (!localStorage.getItem('highest-score')) {
    let highest = { Easy: 0, Normal: 0, Difficult: 0 };
    localStorage.setItem('highest-score', JSON.stringify(highest));
}
document.querySelector('#HSDiv').innerHTML = JSON.parse(localStorage.getItem('highest-score')).Normal;

document.querySelector('#MODE').addEventListener('change', function () {
    songsRun('../songs/7.mp3');
    const selectedValue = this.value;
    console.log('选择的模式：' + selectedValue);
    MODE = selectedValue;
    switch (MODE) {
        case 'Easy':
            document.querySelector('#HSDiv').innerHTML = JSON.parse(localStorage.getItem('highest-score')).Easy;
            break;
        case "Normal":
            document.querySelector('#HSDiv').innerHTML = JSON.parse(localStorage.getItem('highest-score')).Normal;
            break;
        default:
            document.querySelector('#HSDiv').innerHTML = JSON.parse(localStorage.getItem('highest-score')).Difficult;
            break;
    }
});



if (params.get('mode')) {
    switch (params.get('mode')) {
        case 'Normal':
            MODE = params.get('mode');
            break;
        case 'Easy':
            MODE = params.get('mode');
            break;
        case 'Difficult':
            MODE = params.get('mode');
            break;
        default:
            console.error('MODE ERROR! The MODE is ' + params.get('mode'));
            break;
    }
    document.querySelector('#MODE').value = MODE;
    console.log('选择的模式：' + MODE);
}

if (params.get('method')) {
    switch (params.get('method')) {
        case '1':
            document.getElementById('method-1').style.display = 'block';
            METHOD = params.get('method');
            break;
        case '2':
            document.getElementById('method-2&3').style.display = 'block';
            METHOD = params.get('method');
            break;
        case '3':
            document.getElementById('method-2&3').style.display = 'block';
            document.getElementById('jumNum_2Div').style.display = 'block';
            METHOD = params.get('method');
            break;
        default:
            document.getElementById('method-0').style.display = 'block';
            console.error('METHOD ERROR! The METHOD is ' + params.get('method'));
            break;
    }
    console.log('选择的玩法：' + METHOD);
}


function checkCollision() {
    if (!stopEnemy) {
        if (player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y) {
            player.y = canvas.width * 2;
            player.over = true;
            gamePlayerNum--;
            songsRun('../songs/3.mp3');
        } else if (player_2.x < enemy.x + enemy.width &&
            player_2.x + player_2.width > enemy.x &&
            player_2.y < enemy.y + enemy.height &&
            player_2.y + player_2.height > enemy.y) {
            player_2.y = canvas.width * 2;
            player_2.over = true;
            gamePlayerNum--;
            songsRun('../songs/3.mp3');
        }
    }

    if (gamePlayerNum == 0) {
        gameOver = true;
    }
}

function endGame() {
    ctx.font = "120px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(Text, canvas.width / 2, canvas.height / 2);
    Text = "Game Over";
    console.log('game over!');
    if (METHOD == '1') {
        switch (MODE) {
            case 'Easy':
                if (JSON.parse(localStorage.getItem('highest-score')).Easy < player.score) {
                    let a = JSON.parse(localStorage.getItem('highest-score'));
                    a.Easy = player.score;
                    localStorage.setItem('highest-score', JSON.stringify(a));
                    console.log(JSON.stringify(a));
                    document.querySelector('#HSDiv').innerHTML = player.score;
                }
                break;
            case "Normal":
                if (JSON.parse(localStorage.getItem('highest-score')).Normal < player.score) {
                    let a = JSON.parse(localStorage.getItem('highest-score'));
                    a.Normal = player.score;
                    localStorage.setItem('highest-score', JSON.stringify(a));
                    console.log(JSON.stringify(localStorage), localStorage);
                    document.querySelector('#HSDiv').innerHTML = player.score;
                }
                break;
            case 'Difficult':
                if (JSON.parse(localStorage.getItem('highest-score')).Difficult < player.score) {
                    let a = JSON.parse(localStorage.getItem('highest-score'));
                    a.Difficult = player.score;
                    localStorage.setItem('highest-score', JSON.stringify(a));
                    console.log(JSON.stringify(a), a);
                    document.querySelector('#HSDiv').innerHTML = player.score;
                }
                break;
        }
    }

}

function startGame() {
    setTimeout(() => {
        resizeCanvas();
        gameLoop();
        window.addEventListener('resize', function () {
            resizeCanvas();
            // if (!gameOver) {
            //     alert('游戏时请不要更改窗口大小！\n游戏结束！\n请按“ Ent ”键重新开始');
            //     gameOver = true;
            // }
        }); // 窗口大小改变时结束游戏
    }, 500);
    resizeCanvas(); // 初始时调整canvas大小以适应屏幕
}

function initialize() {
    player.jumpNum = 3;
    player_2.jumpNum = 3;
    player.score = 0;
    player_2.score = 0;
    player.x = canvas.width / 2 - 100;
    player_2.x = canvas.width / 2 + 100;
    player.y = 0;
    player_2.y = 0;
    player.isJumping = false;
    player_2.isJumping = false;
    enemy.x = canvas.width - enemy.width;
    enemy.Aleft = true;
    beans = [];
    Bigbeans = [];
    gameOver = false;
    player.over = false;
    if (METHOD == '1' || METHOD == '2') {
        player_2.over = true;
        gamePlayerNum = 1;
    }else if (METHOD == '3') {
        gamePlayerNum = 1;
        player_2.over = false;
    } 
    else {
        player_2.over = false;
        gamePlayerNum = 2;
    }
    gameLoop();
    songsRun('../songs/6.mp3');
}