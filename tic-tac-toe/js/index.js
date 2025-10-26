// 获取页面参数
var params = new URLSearchParams(window.location.search);

// 定义变量 棋盘数组，游戏状态，落子方，初始值
let board = [];
let currentStatus;
let Move = true;
let initValue = true;

// 键盘数字锁🔒，有需求时开，(true):可通过数字键盘[1-9]落子
Keyboard_Num_Lock = false;


// 游戏状态
const gameStatus = {
    IN_PROGRESS: 0,
    PLAYER_WON: 1,
    AI_WON: 2,
    DRAW: 3
};

// 默认游戏难度，类型
let Difficulty = 'medium';
let gameType = 'ai';

// 玩家落子
function playerMove(row, col) {
    if (currentStatus === gameStatus.IN_PROGRESS && board[row][col] === '') {
        if (gameType !== 'ai') {
            if (Move) {
                Move = false;
                board[row][col] = '✖';
            } else {
                Move = true;
                board[row][col] = '⚪';
            }
            renderBoard();
            checkGameStatus();
        } else {
            board[row][col] = '✖';
            renderBoard();
            checkGameStatus();
            // ai落子
            if (currentStatus === gameStatus.IN_PROGRESS && gameType == 'ai') {
                aiMove();
                renderBoard();
                checkGameStatus();
            }
        }
    } else if (currentStatus !== gameStatus.IN_PROGRESS) {
        initGame(Difficulty, gameType);
    }
}

// AI落子
function aiMove() {
    // 获取可用的格子
    let availableMoves = getAvailableMoves();

    // 根据难度选择不同的AI算法
    switch (Difficulty) {
        case 'easy':
            randomMove(availableMoves);
            break;
        case 'medium':
            // 首次落子时随机落子
            if (initValue) {
                randomMove(availableMoves);
                initValue = false;
            } else {
                minimaxMove(availableMoves, 1);
            }
            break;
        case 'hard':
            minimaxMove(availableMoves, 1);
            break;
        default:
            randomMove(availableMoves);
    }
}

// 简单AI随机落子
function randomMove(availableMoves) {
    let randomIndex = Math.floor(Math.random() * availableMoves.length);
    let move = availableMoves[randomIndex];
    board[move.row][move.col] = '⚪';
    console.info('AI 随机落子', [move.row, move.col], board);
}

// AI使用minimax算法进行移动
function minimaxMove(availableMoves, depth) {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let move of availableMoves) {
        board[move.row][move.col] = '⚪';
        let score = minimax(board, depth + 1, false);
        board[move.row][move.col] = '';

        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }

    board[bestMove.row][bestMove.col] = '⚪';
    console.info('AI 搜索落子', [bestMove.row, bestMove.col], board);
}

// Minimax算法
function minimax(board, depth, isMaximizingPlayer) {
    let result = checkWinner();
    if (result !== null) {
        return getScore(result, depth);
    }

    if (isMaximizingPlayer) {
        let bestScore = -Infinity;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = '⚪';
                    let score = minimax(board, depth + 1, false);
                    board[i][j] = '';
                    bestScore = Math.max(bestScore, score);
                }
            }
        }

        return bestScore;
    } else {
        let bestScore = +Infinity;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = '✖';
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = '';
                    bestScore = Math.min(bestScore, score);
                }
            }
        }

        return bestScore;
    }
}

// 根据游戏结果和深度返回分数
function getScore(result, depth) {
    if (result === '✖') {
        // 玩家胜利时返回负分数，因为AI是最小化玩家得分的
        return -10 + depth;
    } else if (result === '⚪') {
        // AI胜利时返回正分数，因为AI是最大化自身得分的
        return 10 - depth;
    } else {
        // 平局返回0
        return 0;
    }
}

// 获取可用的格子
function getAvailableMoves() {
    let moves = [];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
                moves.push({ row, col });
            }
        }
    }
    return moves;
}

// 检查游戏状态：平局、玩家胜利、AI胜利
function checkGameStatus() {
    let winner = checkWinner();
    const container = document.getElementById('container');
    const resultDiv = document.getElementById('result');
    if (winner !== null) {
        if (winner === '✖') {
            currentStatus = gameStatus.PLAYER_WON;
            console.info('%c玩家✖胜利！', 'color:lightgreen;', board);
            resultDiv.innerHTML = "玩家✖胜利！";
        } else if (winner === '⚪') {
            if (gameType == 'ai') {
                currentStatus = gameStatus.AI_WON;
                console.info('%cAI⚪胜利！', 'color:lightgreen;', board);
                resultDiv.innerHTML = "AI⚪胜利！";
            } else {
                currentStatus = gameStatus.PLAYER_WON;
                console.info('%c玩家⚪胜利！', 'color:lightgreen;', board);
                resultDiv.innerHTML = "玩家⚪胜利！";
            }
        } else {
            currentStatus = gameStatus.DRAW;
            console.info('%c双方平局！', 'color:lightgreen;', board);
            resultDiv.innerHTML = "双方平局！";
        }
        container.title = resultDiv.innerHTML + "\n点击棋盘(重新)开始";
    } else {
        if (gameType == 'ai') {
            resultDiv.innerHTML = "进行中...";
            currentStatus = gameStatus.IN_PROGRESS;
            container.title = "进行中...";
        } else {
            if (Move) {
                resultDiv.innerHTML = "玩家✖准备落子中...";
                currentStatus = gameStatus.IN_PROGRESS;
                container.title = "玩家✖准备落子中...";
            } else {
                resultDiv.innerHTML = "玩家⚪准备落子中...";
                currentStatus = gameStatus.IN_PROGRESS;
                container.title = "玩家⚪准备落子中...";
            }

        }
    }
}

// 检查胜利者
function checkWinner() {
    // 检查行
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return board[i][0];
        }
    }

    // 检查列
    for (let j = 0; j < 3; j++) {
        if (board[0][j] !== '' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
            return board[0][j];
        }
    }

    // 检查对角线
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0];
    }

    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2];
    }

    // 检查平局
    let isDraw = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                isDraw = false;
                break;
            }
        }
        if (!isDraw) {
            break;
        }
    }

    if (isDraw) {
        return 'draw';
    }

    return null;
}

// 根据游戏状态渲染棋盘
function renderBoard() {
    let cells = document.getElementsByClassName('cell');
    let index = 0;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            cells[index].title = board[row][col];
            cells[index].innerHTML = board[row][col];
            index++;
        }
    }
}

// 检查并设置游戏难度
function setDifficulty(dif) {
    if (dif) {
        Difficulty = dif;
    } else {
        dif = params.get('dif');
        if (dif) {
            switch (dif) {
                case '0':
                case 'easy':
                    Difficulty = 'easy';
                    break;
                case '2':
                case 'hard':
                    Difficulty = 'hard';
                    break;
                case '1':
                case 'medium':
                    break;
                default:
                    console.error(`参数错误'%c dif=${dif} %c'；\n游戏难度参数的规则(dif=)：\n\t0\t--简单难度 (easy)\n\t1\t--中等难度(medium)\n\t2\t--困难难度 (hard)`, 'color: red;background-color: pink;', '');
                    break;
            }
        }
    }
    const setDifficultyDiv = document.getElementById('setDifficultyDiv');
    console.info('当前游戏难度：', Difficulty);
    setDifficultyDiv.title = '已选中：' + Difficulty;
    let a = { easy: "简单 easy", medium: "中等 medium", hard: "困难 hard" };
    for (const key in a) { if (a.hasOwnProperty(key)) { document.getElementById(key).innerHTML = `<b>${a[key]}</b>`; } }
    if (gameType == 'ai') {
        document.getElementById(Difficulty).innerHTML += `<b style="color: #337ab7;position: absolute;right: 20px;font-size: 200%;margin-top: -10px;">✔</b>`;
    }
}

// 检查并设置游戏类型(player,ai)
function setType(t) {
    if (t) {
        gameType = t;
    } else {
        t = params.get('type')
        if (t) {
            switch (t) {
                case 'ai':
                case '0':
                    gameType = 'ai';
                    break;

                case 'player':
                case '1':
                    gameType = 'player';
                    break;
                default:
                    console.error(`参数错误'%c type=${t} %c'；\n游戏类型参数的规则(type=)：\n\t0\t--与AI对战  (ai)\n\t1\t--与玩家对战(player)`, 'color: red;background-color: pink;', '');
                    break;
            }
        }
    }
    const setTypeDiv = document.getElementById('setTypeDiv');
    console.info('当前游戏类型：', gameType);
    setTypeDiv.title = '已选中：' + gameType;
    document.getElementById('ai').style.backgroundColor = '#555';
    document.getElementById('player').style.backgroundColor = '#555';
    document.getElementById(gameType).style.backgroundColor = '#337ab7';
    let b = ['easy', 'medium', 'hard'];
    for (let i = 0; i < b.length; i++) {
        if (gameType == 'ai') {
            document.getElementById(b[i]).disabled = false;
        } else {
            document.getElementById(b[i]).disabled = true;
        }
    }

}

// Z-Box相关操作
function Box(a, b) {
    console.log(`Z-Box: (${a}) the (${b});`);
    if (a == 'close') {
        if (b) {
            document.getElementById(b).style.height = "0vh";
            setTimeout(() => { document.getElementById('Z-Box').style.display = 'none'; }, 300);
            initGame(Difficulty, gameType)
        }
    } else if (a == 'show' || a == 'open') {
        if (b) {
            document.getElementById('Z-Box').style.display = 'block';
            setTimeout(() => { document.getElementById(b).style.height = "80vh"; }, 10);
        }
    }
}

// 初始化游戏-参数(难度，类型)
function initGame(Dif, ty) {
    // 初始化棋盘数组，落子方，初始值，result框
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    if (currentStatus == gameStatus.PLAYER_WON) { Move = !Move; }
    initValue = true;
    if (Move) {
        document.getElementById('result').innerHTML = '请玩家 ✖ 开始落子';
    } else {
        if (gameType == 'ai') {
            document.getElementById('result').innerHTML = '请玩家 ✖ 开始落子';
        } else {
            document.getElementById('result').innerHTML = '请玩家 ⚪ 开始落子';
        }
    }

    // 初始化游戏状态，默认为进行中
    currentStatus = gameStatus.IN_PROGRESS;
    renderBoard();
    setDifficulty(Dif);
    setType(ty)
    console.log('%c 已初始化井字棋！ ', 'background:green;padding:5px;');
}

// 定义重新开始按键(R), 数字键
document.addEventListener('keyup', function (event) {
    console.log('按下了：', event.key, event);
    if (event.key == "r" || event.key == "R" || event.code === 'keyR' || event.key == "0") {
        initGame(Difficulty, gameType);
    }
    if (Keyboard_Num_Lock) {
        if (!isNaN(parseInt(event.key))) {
            let keyNum = [[7, 8, 9], [4, 5, 6], [1, 2, 3,]];
            keyNum.some((innerArray, i) => {
                const j = innerArray.findIndex(value => value.toString() === event.key);
                if (j !== -1) { playerMove(i, j) }
            });
        }
    }
})

// 用户设备信息
console.log('用户设备信息：', navigator);

initGame();