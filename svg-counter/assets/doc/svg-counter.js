"use strict";

/**
 * SVGCounter 是一个轻量级的SVG数字计数器，可以快速生成带有动画的SVG数字。
 * @author Jin-Royal
 * @version 1.0.0
 * @license MIT
 * 
 * @param {string} querySelector 选择器，用于定位目标元素
 * @param {object} options 配置选项
 * 
 * @param {string} options.theme 主题图像路径，支持通配符，例如："assets/theme/booru-lewd/*.gif"
 * @param {boolean} options.darkMode 暗黑模式开关
 * @param {string} options.className CSS类名称
 * @param {string} options.id 自定义ID
 */
class SVGCounter {
    constructor(querySelector, options = {}) {
        // 选择目标元素并初始化默认配置
        this.element = document.querySelector(querySelector);
        this.defaults = {
            theme: "assets/theme/booru-lewd/*.gif", // 主题图像路径
            darkMode: false, // 暗黑模式开关
            className: "svg-counter", // CSS类名称
            id: null // 自定义ID
        };

        // 合并默认配置和用户自定义配置
        this.data = Object.assign({}, this.defaults, options);

        // 初始化SVGCounter
        this.init();
    }

    init() {
        // 根据配置设置暗黑模式
        const darkMode = this.data.darkMode;

        this.paths = {}; // 存储数字对应的路径
        this.target = document.createElementNS("http://www.w3.org/2000/svg", "svg"); // 创建SVG元素
        this.target.setAttribute("width", "100%"); // 设置SVG宽度为100%
        this.target.setAttribute("height", "100%"); // 设置SVG高度为100%
        this.data.id && this.target.setAttribute("id", this.data.id); // 设置SVG ID
        this.target.setAttribute("class", this.data.className); // 设置CSS类

        // 如果开启暗黑模式，调整亮度
        if (darkMode) {
            this.target.style.setProperty("filter", "brightness(0.6)");
        }

        // 初始化数字路径
        for (let i = 0; i < 10; i++) {
            this.paths[`${i}`] = this.data.theme.replace("*", i); // 根据数字生成路径
        }
    }

    setSVG(value) {
        const text = value.toString(); // 转换为字符串
        this.value = value; // 保存当前值

        // 获取路径和目标SVG元素
        const paths = this.paths;
        const target = this.target;

        // 清空目标SVG中的现有子元素
        while (target.firstChild) {
            target.removeChild(target.firstChild);
        }

        // 创建定义区域和图形元素
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");

        // 遍历数字的每一位
        for (let i = 0; i < text.length; i++) {
            const digit = text[i]; // 当前数字
            const image = document.createElementNS("http://www.w3.org/2000/svg", "image"); // 创建图像元素

            // 设置图像的属性
            image.setAttributeNS("http://www.w3.org/1999/xlink", "href", paths[digit]);
            image.setAttribute("id", `${this.data.id || "counter"}-${digit}`);
            image.setAttribute("width", `${(100 / (text.length))}%`); // 每个数字占用百分比的宽度
            image.setAttribute("height", "100%");

            const use = document.createElementNS("http://www.w3.org/2000/svg", "use"); // 创建use元素
            use.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#${this.data.id || "counter"}-${digit}`);

            // 动态计算每个数字的 x 坐标
            use.setAttribute("x", `${(i * (100 / (text.length)))}%`);

            // 将图像和use元素添加到定义区域和图形组
            g.appendChild(use);
            defs.appendChild(image);
        }

        // 将定义区域和图形组添加到目标SVG
        target.appendChild(defs);
        target.appendChild(g);

        // 将SVG添加到目标元素
        this.element.appendChild(target);
    }

    setTheme(theme) {
        this.data.theme = theme;
        this.paths = {}; // 初始化数字路径
        for (let i = 0; i < 10; i++) {
            this.paths[`${i}`] = this.data.theme.replace("*", i); // 根据数字生成路径
        }
        this.setSVG(this.value); // 重新渲染数字
    }

    setDarkMode(darkMode) {
        this.data.darkMode = darkMode;
        this.target.style.setProperty("filter", darkMode ? "brightness(0.6)" : "none");
    }
}

export default SVGCounter;