document.addEventListener('DOMContentLoaded', () => {
    // 游戏状态
    const gameState = {
        board: Array(9).fill(''),
        currentPlayer: '✖',
        gameMode: null,
        gameActive: false,
        gameOver: false
    };

    // DOM元素
    const gameBoard = document.getElementById('gameBoard');
    const gameInfo = document.getElementById('gameInfo');
    const resultDisplay = document.getElementById('result');
    const restartBtn = document.getElementById('restartBtn');
    const modeButtons = document.querySelectorAll('.mode-btn');

    // 初始化游戏
    function initGame() {
        // 创建棋盘格子
        gameBoard.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', () => handleCellClick(i));
            gameBoard.appendChild(cell);
        }

        // 重置游戏状态
        gameState.board = Array(9).fill('');
        gameState.currentPlayer = '✖';
        gameState.gameActive = true;
        gameState.gameOver = false;

        // 清空结果显示
        resultDisplay.textContent = '';
        resultDisplay.className = 'result';

        // 更新游戏信息
        updateGameInfo();
    }

    // 更新游戏信息显示
    function updateGameInfo() {
        if (!gameState.gameMode) {
            gameInfo.textContent = '请选择游戏模式开始游戏';
            return;
        }

        if (gameState.gameOver) return;

        const modeNames = {
            'two-players': '双人游戏',
            'easy': '简单AI',
            'medium': '普通AI',
            'hard': '困难AI'
        };

        const playerNames = {
            '✖': '玩家 ✖',
            '⭕︎': gameState.gameMode === 'two-players' ? '玩家 ⭕︎' : 'AI'
        };

        gameInfo.textContent = `${modeNames[gameState.gameMode]} - 当前回合: ${playerNames[gameState.currentPlayer]}`;
    }

    // 处理格子点击
    function handleCellClick(index) {
        // 游戏未开始或已结束，或者格子已被占用
        if (!gameState.gameActive || !gameState.gameMode || gameState.gameOver || gameState.board[index] !== '') {
            return;
        }

        // 在双人模式下，或者当前是玩家回合
        if (gameState.gameMode === 'two-players' || gameState.currentPlayer === '✖') {
            makeMove(index);

            // 如果不是双人模式且游戏未结束，则AI走棋
            if (gameState.gameMode !== 'two-players' && !gameState.gameOver) {
                setTimeout(() => {
                    makeAIMove();
                }, 500);
            }
        }
    }

    // 执行走棋
    function makeMove(index) {
        // 更新棋盘状态
        gameState.board[index] = gameState.currentPlayer;

        // 更新UI
        const cell = document.querySelector(`.cell[data-index="${index}"]`);
        cell.textContent = gameState.currentPlayer;
        cell.classList.add(gameState.currentPlayer.toLowerCase());

        // 检查游戏是否结束
        checkGameStatus();

        // 如果没有结束，切换玩家
        if (!gameState.gameOver) {
            gameState.currentPlayer = gameState.currentPlayer === '✖' ? '⭕︎' : '✖';
            updateGameInfo();
        }
    }

    // AI走棋
    function makeAIMove() {
        if (gameState.gameOver) return;

        let moveIndex;

        switch (gameState.gameMode) {
            case 'easy':
                moveIndex = getEasyAIMove();
                break;
            case 'medium':
                moveIndex = getMediumAIMove();
                break;
            case 'hard':
                moveIndex = getHardAIMove();
                break;
        }

        if (moveIndex !== undefined) {
            makeMove(moveIndex);
        }
    }

    // 简单AI：随机选择空位
    function getEasyAIMove() {
        const emptyCells = gameState.board
            .map((cell, index) => cell === '' ? index : null)
            .filter(index => index !== null);

        return emptyCells.length > 0 ?
            emptyCells[Math.floor(Math.random() * emptyCells.length)] :
            undefined;
    }

    // 普通AI：基于简单规则
    function getMediumAIMove() {
        // 1. 如果能赢，就赢
        let move = findWinningMove('⭕︎');
        if (move !== undefined) return move;

        // 2. 如果能阻止玩家赢，就阻止
        move = findWinningMove('✖');
        if (move !== undefined) return move;

        // 3. 否则随机选择
        return getEasyAIMove();
    }

    // 困难AI：使用Minimax算法
    function getHardAIMove() {
        return minimax(gameState.board, '⭕︎').index;
    }

    // Minimax算法实现
    function minimax(board, player) {
        // 检查游戏是否结束
        const winner = checkWinner(board);
        if (winner === '⭕︎') return { score: 10 };
        if (winner === '✖') return { score: -10 };
        if (isBoardFull(board)) return { score: 0 };

        // 收集所有可能的走法
        const moves = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                const move = {};
                move.index = i;

                // 尝试这一步
                board[i] = player;

                // 递归调用minimax
                if (player === '⭕︎') {
                    const result = minimax(board, '✖');
                    move.score = result.score;
                } else {
                    const result = minimax(board, '⭕︎');
                    move.score = result.score;
                }

                // 撤销这一步
                board[i] = '';

                moves.push(move);
            }
        }

        // 选择最佳走法
        let bestMove;
        if (player === '⭕︎') {
            let bestScore = -Infinity;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        return moves[bestMove];
    }

    // 查找获胜的走法
    function findWinningMove(player) {
        for (let i = 0; i < gameState.board.length; i++) {
            if (gameState.board[i] === '') {
                // 模拟这一步
                gameState.board[i] = player;

                // 检查是否获胜
                if (checkWinner(gameState.board) === player) {
                    // 撤销模拟
                    gameState.board[i] = '';
                    return i;
                }

                // 撤销模拟
                gameState.board[i] = '';
            }
        }
        return undefined;
    }

    // 检查游戏状态
    function checkGameStatus() {
        const winner = checkWinner(gameState.board);

        if (winner) {
            gameState.gameOver = true;
            gameState.gameActive = false;

            const winnerName = winner === '✖' ? '玩家 ✖' :
                (gameState.gameMode === 'two-players' ? '玩家 ⭕︎' : 'AI');

            resultDisplay.textContent = `${winnerName} 获胜!`;
            resultDisplay.classList.add('win');
        } else if (isBoardFull(gameState.board)) {
            gameState.gameOver = true;
            gameState.gameActive = false;

            resultDisplay.textContent = '平局!';
            resultDisplay.classList.add('draw');
        }
    }

    // 检查是否有获胜者
    function checkWinner(board) {
        // 所有可能的获胜组合
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // 竖
            [0, 4, 8], [2, 4, 6]             // 对角
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return null;
    }

    // 检查棋盘是否已满
    function isBoardFull(board) {
        return board.every(cell => cell !== '');
    }

    // 模式选择
    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 更新活动按钮
            modeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 设置游戏模式
            gameState.gameMode = button.dataset.mode;

            // 初始化游戏
            initGame();
        });
    });

    // 绑定数字键盘事件
    document.addEventListener('keydown', event => {
        const { code } = event;
        if (code.startsWith('Numpad')) {
            const index = parseInt(code.slice(-1));
            if (index >= 7) {
                handleCellClick(index - 7);
            } else if (index <= 3) {
                handleCellClick(index + 5);
            } else {
                handleCellClick(index - 1);
            }
        }
    });

    // 重新开始游戏
    restartBtn.addEventListener('click', initGame);

    // 初始化游戏
    initGame();
});