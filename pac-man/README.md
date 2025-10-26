# Pac-Man

该项目是一个基于 Electron 的应用开发项目,使用HTML＋JS＋CSS<br/>

- [<b>项目结构介绍</b>](#项目结构介绍)
- [<b>功能特点</b>](#功能特点)
- [<b>快速上手</b>](#快速上手)
- [<b>结尾</b>](#结尾)

## 项目结构介绍

<details>
  <summary>点击查看结构目录</summary>

- [html](html/)
  - [/ Game_Pac_Man.html(游戏本体)](html/Game_Pac_Man.html)

- [js(脚本)](js/)
  - [/ Game_beans.js(豆子)](js/Game_beans.js)
  - [/ Game_enemy.js(敌人)](js/Game_enemy.js)
  - [/ Game_keys.js(按键)](js/Game_keys.js)
  - [/ Game_Loop.js(循环)](js/Game_Loop.js)
  - [/ Game_players.js(玩家)](js/Game_players.js)
  - [/ Game_scene.js(分数)](js/Game_scene.js)
  - [/ Game_script.js(其他脚本)](js/Game_script.js)
  - [/ Game_songs.js(音频)](js/Game_songs.js)

- [imgs(图片)](imgs/)
  - [/ p1.png](imgs/p1.png)
  - [/ p2.png](imgs/p2.png)

- [css(样式)](css/)
  - [/ Pac-Man-game.css(游戏样式)](css/Pac-Man-game.css)
  - [/ Pac-Man-index.css(主页样式)](css/Pac-Man-index.css)

- [songs(音频)](songs/)
  - [/ 0.mp3](songs/0.mp3)
  - [. . .](songs)
  - [. . .](songs)
  - [. . .](songs)
  - [/ 7.mp3](songs/7.mp3)

- [icons(图标)](icons/)
  - [/ i.ico(项目图标)](icons/i.ico)
  - [/ u.ico(卸载图标)](icons/u.ico)

- [index.html(主页)](index.html)
- [main.js(主进程)](main.js)
- [preload.js(渲染进程,没什么用)](preload.js)
- [README.md](README.md)
- [package-lock.json(依赖配置)](package-lock.json)
- [package.json(打包配置)](package.json)
</details>

## 功能特点

- 使用 Electron 技术构建的跨平台桌面应用
- 支持在不同操作系统上运行，如 Windows、macOS 和 Linux
- 前端提供丰富的界面和用户交互功能
- 支持自定义插件和扩展功能，库、框架等适用

## 快速上手

### 环境要求

在开始之前，请确保你的开发环境满足以下要求：

- Node.js（建议使用最新版本）
- npm 或 yarn 包管理工具

### 下载代码

克隆或下载本项目到本地开发环境：
```shell
git clone https://github.com/Roy-Jin/web-demo.git
```

### 安装依赖

进入项目根目录，并使用以下命令安装依赖：
```shell
cd web-demo/pac-man/
npm install
```

或者使用 yarn：
```shell
cd pac-man
yarn install
```

### 运行应用
安装完成后，使用以下命令启动应用：
```shell
npm run start
```

或者使用 yarn：
```shell
yarn start
```

## 结尾

如果你对该类型项目感兴趣，可以进入我的[网站](https://r-j.pages.dev)查看更多信息!

感谢您使用本项目！