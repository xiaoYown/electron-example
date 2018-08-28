const path = require('path')
const { ipcRenderer } = require('electron')
const electron = require('electron')
const ChattingWindow = require(path.join(__dirname, './src/windows/controllers/chatting'))

let chats = document.querySelectorAll('[chat-room]')
chats.forEach(chat => {
  chat.addEventListener('click', e => {
    let chatting = new ChattingWindow()
    chatting.show(chat.getAttribute('chat-room'))
  })
})

let events = ['undo', 'redo', 'cut', 'copy', 'paste', 'selectall'];
  
events.forEach(__event__ => {
  window.addEventListener(__event__, event => {
    console.log(event);
  });
});

ipcRenderer.on('AGANI::edit', (e, { type }) => {
  console.log(e)
  console.log(type)
})
