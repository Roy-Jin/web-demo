const NEXT_DIRECTION = {
    ArrowUp: (r, c) => [r + 1, c],
    ArrowDown: (r, c) => [r - 1, c],
    ArrowLeft: (r, c) => [r, c + 1],
    ArrowRight: (r, c) => [r, c - 1]
}

const DIRECTION = {
    ArrowUp: (row, col, callback) => executeCallback(0, col, index => callback(0, index)),
    ArrowDown: (row, col, callback) => executeCallback(0, col, index => callback(row - 1, index)),
    ArrowLeft: (row, col, callback) => executeCallback(0, row, index => callback(index, 0)),
    ArrowRight: (row, col, callback) => executeCallback(0, row, index => callback(index, col - 1))
}

const eventList = {}

/**
 * 格子棋盘
 */
class CellBorder {

    constructor(row, col) {
        this.row = row
        this.col = col
        this.cellList = []
        // 事件列表
        this.eventList = {}
        // 空白数量
        this.blankCount = row * col
        // 游戏结束标识
        this.gameOver = false

        this.init()
    }

    /**
     * 初始化函数
     */
    init() {
        // 初始化容器
        this.initContainer()

        // 生成随机两个cell，并添加到容器
        this.generatorCell(2)
    }

    /**
     * 初始化容器数据
     */
    initContainer() {
        boardEl.innerHTML = ''
        for (let r = 0; r < this.row; r++) {
            const row = document.createElement('div')
            row.className = 'row-cell'
            this.cellList[r] = new Array(this.col)
            for (let c = 0; c < this.col; c++) {
                const cell = document.createElement('div')
                cell.className = 'cell'
                row.appendChild(cell)
            }
            boardEl.appendChild(row)
        }
    }

    /**
     * 生成随机两个cell
     */
    generatorCell(number = 1, options = [2, 4]) {
        if (number > this.blankCount) {
            number = this.blankCount
        }
        while (number-- > 0) {
            let r = getRandomInt(0, this.row)
            let c = getRandomInt(0, this.col)
            while (this.cellList[r][c]) {
                r = getRandomInt(0, this.row)
                c = getRandomInt(0, this.col)
            }
            // 随机2 || 4
            const index = getRandomInt(0, options.length)

            // 创建cell
            this.cellList[r][c] = new Cell(r, c, options[index])
            this.blankCount-- // 空白位置减少
        }
    }

    /**
     * doCall
     */
    doCall(key) {
        const callback = DIRECTION[key]
        if (callback && !this.gameOver) {
            // 判断游戏是否结束
            if (this.isGameOver()) {
                this.gameOver = true
                gameOverEl.classList.add('active')
            } else {
                callback(this.row, this.col, (r, c) => this.call(r, c, key))

                // 重新生成新的cell
                this.generatorCell()
            }
        }
    }

    /**
     * 计算每行，每列
     */
    call(r, c, d) {
        if (!this.isRange(r, c)) return
        const curNode = this.cellList[r][c]
        // 得到下一个节点
        const nextNode = this.getNextNode(r, c, d)
        if (!nextNode) return
        const { row, col, value } = nextNode
        // 当前位置没有元素，位置交换（移动操作）
        if (!curNode) {
            nextNode.reLocation('move', r, c)
            this.cellList[r][c] = nextNode
            this.cellList[row][col] = null
            return this.call(r, c, d)
        }
        // 当前有元素并且值相同（合并操作）
        else if (curNode.value === value) {
            const animate = nextNode.reLocation('move', r, c)
            this.cellList[row][col] = null
            setTimeout(e => {
                boardEl.removeChild(nextNode.dom)
                boardEl.removeChild(curNode.dom)
                this.cellList[r][c] = new Cell(r, c, value * 2)
            }, 80)
            this.blankCount++ // 空白位置增加
            // 发布加分事件
            this.publishScore('score', value * 2)
        }
        // 递归进行下一个cell
        const [nextR, nextC] = NEXT_DIRECTION[d](r, c)
        this.call(nextR, nextC, d)
    }

    /**
     * 获取下一个节点
     */
    getNextNode(r, c, d) {
        let [nextR, nextC] = NEXT_DIRECTION[d](r, c)
        while (this.isRange(nextR, nextC)) {
            if (this.cellList[nextR][nextC]) {
                return this.cellList[nextR][nextC]
            }
            [nextR, nextC] = NEXT_DIRECTION[d](nextR, nextC)
        }
        return null
    }

    /**
     * 检查是否在范围内
     */
    isRange(row, col) {
        return row >= 0 && row < this.row && col >= 0 && col < this.col
    }

    /**
     * 检查游戏是否结束
     */
    isGameOver() {
        // 存在空白位置，游戏没有结束
        if (this.blankCount > 0) {
            return false
        }
        // 定义方向
        const dir = [[1, 0], [0, 1]]

        // 检查每一个cell可操作，存在可操作
        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.col; c++) {
                for (let d = 0; d < dir.length; d++) {
                    let a = r + dir[d][0]
                    let b = c + dir[d][1]
                    // 在范围内
                    if (this.isRange(a, b) && this.cellList[r][c].value === this.cellList[a][b].value) {
                        return false
                    }
                }
            }
        }
        return true
    }

    /**
     * 发布事件
     */
    publishScore(event, data) {
        eventList[event].call(this, data)
    }

    /**
     * 订阅事件
     */
    subscribe(event, callback) {
        eventList[event] = callback
    }

}

/**
 * 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @returns 结果
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

/**
 * 在范围内执行回调
 */
function executeCallback(min, max, callback) {
    while (min < max) callback(min++)
}