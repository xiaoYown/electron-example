const { app, Menu, BrowserWindow } = require('electron')

const path = require('path')
const url = require('url')

const menuOptions = require('./src/menu')()
const { findReopenMenuItem } = require('./src/menu/utils')

const Message = require('./src/handlers/message')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let winMain // 主视口

function ready () {
  console.log('ready')
  let mainMenu = Menu.buildFromTemplate(menuOptions)
  Menu.setApplicationMenu(mainMenu)
  
  // Create the browser window.
  winMain = new BrowserWindow({
    width: 1000,
    height: 800,
    // resizable: false
  })
  winMain.setMenu(mainMenu)


  // and load the index.html of the app.
  winMain.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  this.message = new Message()

  this.message.bindShowMessage()

  // Open the DevTools.
  // winMain.webContents.openDevTools()

  // Emitted when the window is closed.
  winMain.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    winMain = null
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', ready)

// // Quit when all windows are closed.
// app.on('window-all-closed', function () {
//   // On OS X it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })


/* 周期事件 */
app.on('browser-window-created', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = false
})
function willFinishLaunching (event) {
  console.log('will-finish-launching')
}
function windowAllClosed (event) {
  console.log('window-all-closed')
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = true
  app.quit()
}
function beforeQuit (event) {
  console.log('before-quit')
}
function willQuit (event) {
  console.log('will-quit')
}
function quit (event) {
  console.log('quit')
}
// 1.当应用程序完成基础的启动的时候被触发
app.on('will-finish-launching', willFinishLaunching)
// 2.Electron 完成初始化时被触发
app.on('ready', ready)
// 3.当所有的窗口都被关闭时触发
app.on('window-all-closed', windowAllClosed)
// 4.在应用程序开始关闭窗口之前触发
app.on('before-quit', beforeQuit)
// 5.当所有窗口都已关闭并且应用程序将退出时触发
app.on('will-quit', willQuit)
// 6.在应用程序退出时触发
app.on('quit', quit)

/* 操作事件 */
function openFile (event) {
  console.log('open-file')
  console.log(event)
}
// 1.当用户想要在应用中打开一个文件时发出, 也会在一个文件被拖到 dock 并且还没有运行的时候发出
app.on('open-file', openFile)



app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (winMain === null) {
    ready()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
