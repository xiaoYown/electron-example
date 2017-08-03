const path = require('path')
const ChattingWindow = require(path.join(__dirname, './src/windows/controllers/chatting'))

let chats = document.querySelectorAll('[chat-room]')
chats.forEach(chat => {
  chat.addEventListener('click', e => {
    let chatting = new ChattingWindow()
    chatting.show(chat.getAttribute('chat-room'))
  })
})