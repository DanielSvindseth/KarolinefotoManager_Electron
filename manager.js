function id(id) { return document.getElementById(id) }

const fs = require('fs-extra')
const {app, globalshortcut, ipcRenderer, dialog} = require('electron')

var appRoot
var dataDir = './photos'

function listFiles(dir) {
  console.log('Listing files in ' + dir)
  let output = id('output')
  let fileName

  fs.readdir(dir, function(err, files) {
    if (err) { return console.error(err) }

    files.forEach(function(file) {
      let item = document.createElement('li')
      let img = document.createElement('img')
      let label = document.createElement('p')
      console.log(dir + '/' + file);
      img.setAttribute('src', dir + '/' + file)
      label.innerHTML = file
      item.appendChild(img)
      item.appendChild(label)
      output.appendChild(item)
    })
  console.log('done')
  })
}

listFiles(dataDir)
