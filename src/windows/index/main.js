const path = require('path');
const { app, Menu, BrowserWindow } = require('electron');

const menuTemplate = require('../../menu/index')();

const winURL = `file://${path.join(__dirname, '../../pages/index.html')}`;

let win;
let menu;

function initWindow () {
  win = new BrowserWindow();
  menu = Menu.buildFromTemplate(menuTemplate);

  win.setMenu(menu);

  win.loadURL(winURL);
}

// 1.当应用程序完成基础的启动的时候被触发
// app.on('will-finish-launching', willFinishLaunching)
// 2.Electron 完成初始化时被触发
app.on('ready', initWindow);
// 3.当所有的窗口都被关闭时触发
// app.on('window-all-closed', windowAllClosed)
// 4.在应用程序开始关闭窗口之前触发
// app.on('before-quit', beforeQuit)
// 5.当所有窗口都已关闭并且应用程序将退出时触发
// app.on('will-quit', willQuit)
// 6.在应用程序退出时触发
// app.on('quit', quit)
