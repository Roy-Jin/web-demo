/**
    * 格子类
    */
class Cell {
    /**
     * 构造函数
     * @param {Number} row 所在行号
     * @param {Number} col 所在列号
     * @param {Number} value 数值
     */
    constructor(row, col, value) {
        this.value = value
        this.row = row
        this.col = col

        // 创建dom元素，并对其重新定位
        this.dom = this.createDom(boardEl)
        this.reLocation('gen')
    }

    /**
     * 创建dom元素
     */
    createDom(parentNode) {
        const dom = document.createElement('div')
        dom.innerText = this.value
        dom.className = 'cell real-cell'
        dom.style.color = Map[this.value].color || '#f9f6f2'
        dom.style.backgroundColor = Map[this.value].bColor || '#3c3a32'
        parentNode.append(dom)
        return dom
    }

    /**
     * 重新定位
     */
    reLocation(type, r = this.row, c = this.col) {
        const padding = 0;

        const rect = this.dom.getBoundingClientRect()
        const fromLeft = rect.width * this.col + (this.col * padding) + 'px'
        const fromTop = rect.height * this.row + (this.row * padding) + 'px'
        const toLeft = rect.width * c + (c * padding) + 'px'
        const toTop = rect.height * r + (r * padding) + 'px'

        this.row = r
        this.col = c

        // this.dom.getAnimations().forEach(animate => animate.cancel())
        return this.dom.animate(getAnimations(type, { fromLeft, fromTop, toLeft, toTop }), { duration: 80, fill: 'forwards' })
    }

}

/**
 * 根据类型获取动画列表
 */
function getAnimations(type, rect) {
    let list = []
    switch (type) {
        case 'gen':
            return [
                { left: rect.fromLeft, top: rect.fromTop, transform: 'scale(0)' },
                { left: rect.toLeft, top: rect.toTop, transform: 'scale(1)' }
            ]
        case 'move':
            return [
                { left: rect.fromLeft, top: rect.fromTop },
                { left: rect.toLeft, top: rect.toTop }
            ]
    }
    return list
}