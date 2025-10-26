let keydownFlag = false
const scoreEl = document.querySelector('.score .value')
const bestScoreEl = document.querySelector('.best .value')
const newGameEl = document.querySelector('.new-game-btn')
const boardEl = document.querySelector(".board-box")
const gameOverEl = document.querySelector(".game-over")

class Game {
    constructor([row, col], cacheKey) {
        this.row = row
        this.col = col
        this.totalScore = 0
        this.totalBestScore = localStorage.getItem(cacheKey) || 0
        bestScoreEl.innerText = this.totalBestScore

        this.cellBorder = new CellBorder(row, col)
        this.initEvent()
    }

    // 初始化事件
    initEvent() {
        window.addEventListener('keydown', event => {
            if (!keydownFlag) {
                keydownFlag = true
                this.cellBorder.doCall(event.key)
            }
        })
        window.addEventListener('keyup', event => {
            keydownFlag = false
        })

        newGameEl.addEventListener('click', this.restart.bind(this))

        this.cellBorder.subscribe('score', this.addScore.bind(this))
    }

    /**
     * 加分
     */
    addScore(value) {
        this.totalScore += value
        if (this.totalScore > this.totalBestScore) {
            this.totalBestScore = this.totalScore
            localStorage.setItem(cacheKey, this.totalBestScore)
            bestScoreEl.innerText = this.totalBestScore
        }
        scoreEl.innerText = this.totalScore
        const effect = document.createElement('div')
        effect.innerText = '+' + value
        effect.className = 'effect'
        scoreEl.appendChild(effect)
    }

    /**
     * 重新开始
     */
    restart() {
        this.totalScore = 0
        this.cellBorder = new CellBorder(this.row, this.col)
        scoreEl.innerText = 0

        gameOverEl.classList.remove('active')
    }

}