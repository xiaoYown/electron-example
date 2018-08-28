const electron = require('electron')

let template = [{
  label: '文件',
  submenu: [{
    label: '关闭',
    role: 'close'
  }]
}, {
  label: '帮助',
  role: 'help',
  submenu: [{
    label: '学习更多',
    click: function () {
      electron.shell.openExternal('http://electron.atom.io')
    }
  }]
}]

if (process.platform === 'darwin') {
  const name = electron.app.getName()
  template.unshift({
    label: name,
    submenu: [{
      label: '服务',
      role: 'services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      label: `隐藏 ${name}`,
      accelerator: 'Command+H',
      role: 'hide'
    }, {
      label: '隐藏其它',
      accelerator: 'Command+Alt+H',
      role: 'hideothers'
    }]
  })
}

module.exports = () => template
