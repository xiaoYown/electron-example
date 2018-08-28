const edit = (win, type) => {
  console.log(win.webContents.send)
  win.webContents.send('AGANI::edit', { type })
}

module.exports = {
  edit
}
