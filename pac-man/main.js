const { info } = require('console');
const { app, BrowserWindow, ipcMain, globalShortcut, dialog } = require('electron')
const path = require('path')

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    resizable: false,
    movable: false,
    icon: 'icons/i.ico',
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,//
      contextIsolation: false, //这俩个设置很重要，影响渲染进程的api使用
      preload: path.join(__dirname, 'preload.js'), //加入preload的js文件
      devTools: true
    }
  })
  mainWindow.loadFile('index.html');
  //打开Dev调试框工具
  //mainWindow.webContents.openDevTools();
}

app.on('ready', function () {
  createWindow();
  console.info('****Project ready!');
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('window-all-closed', function () {
  globalShortcut.unregisterAll();
  if (process.platform !== 'darwin') app.quit()
  console.info('****Project End!');
}) 