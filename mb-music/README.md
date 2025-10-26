# MB-Music 音乐播放器

## 简介

MB-Music 是一个基于 APlayer 库的曼波（哈基米）音乐播放器项目

## 主要功能

- 随机播放：暂只支持随机播放歌单中的音乐
- 歌词显示：支持歌词显示，包括原歌词和翻译歌词
- 进度条拖动：允许用户通过拖动进度条来控制音乐的播放位置
- 高精度图片：自动替换为高精度的音乐封面图片

## 技术栈

- HTML/CSS：用于构建播放器的界面和样式
- JavaScript：用于实现播放器的交互逻辑
- Font Awesome：用于播放器的图标
- APlayer：一个轻量级的音乐播放器库
- Color Thief：用于从音乐封面图片中提取主题颜色

## 项目结构

```
MB-Music/
├── fonts/
│   ├── 仓耳渔阳体W03.ttf
│   └── Electrolize-Regular.woff2
├── index.html
├── LICENSE
├── script/
│   ├── index.js
│   └── musicData.js
└── style/
    ├── base.css
    └── index.css
```

## 使用说明

1. 克隆项目：
   ```bash
   git clone https://github.com/Roy-Jin/web-demo.git
   cd web-demo/MB-Music/
   ```

2. 导入项目文件：
   - 将项目文件导入到你的本地服务器或部署到你的网站

3. 打开播放器：
   - 在浏览器中访问 index.html，即可看到并使用音乐播放器

## 自定义设置

- 歌单 ID：在 script/musicData.js 文件中修改 id 参数以更改默认的播放列表
- 主题颜色：播放器会根据音乐封面自动调整主题颜色，你也可以在 style/base.css 中自定义 --theme-color 等颜色变量

## 贡献

欢迎对 MB-Music 提出改进和代码贡献。请通过以下步骤参与贡献：

1. Fork 项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 联系方式

- 作者：Roy-Jin
- GitHub：[https://github.com/Roy-Jin](https://github.com/Roy-Jin)

## 致谢

- 歌单列表：感谢来自网易云音乐用户 @九次v 的歌单[【曼波～（哈基米活全家音乐）】](https://music.163.com/m/playlist?id=13866167529)
- APlayer：感谢 @MetingAPI 的开源工作
- Color Thief：感谢 @lokesh/color-thief 提供的色彩提取工具

通过以上信息，希望你能享受 MB-Music 带来的音乐体验。如果有任何问题或建议，欢迎通过 GitHub 仓库进行反馈
