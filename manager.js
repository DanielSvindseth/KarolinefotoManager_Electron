function id(id) { return document.getElementById(id) }

const fs = require('fs-extra')
const {app, globalshortcut, ipcRenderer, dialog} = require('electron')

var appRoot
var dataDir = './photos'
var photoList = []


function dragstartHandler(ev) {
  // Add the target element's id to the data transfer object
  ev.dataTransfer.setData("text/plain", ev.target.id)
  ev.dataTransfer.dropEffect = "copy"
}

function dragoverHandler(ev) {
  ev.preventDefault()
  ev.dataTransfer.dropEffect = "move"
}

function dropHandler(ev) {
  ev.preventDefault()
  // Get the id of the target and add the moved element to the target's DOM
  const data = ev.dataTransfer.getData("text/plain")
  ev.target.appendChild(id(output))
}


function listFiles(dir, list) {
  console.log('Listing files in ' + dir)
  let output = id('output')
  let fileName

  fs.readdir(dir, function(err, files) {
    if (err) { return console.error(err) }
    let n = 1
    files.forEach(function(file) {
      let item = document.createElement('li')
      let img = document.createElement('img')
      let label = document.createElement('p')
      let eId = 'photo' + n
      console.log(dir + '/' + file);
      img.setAttribute('src', dir + '/' + file)
      label.innerHTML = file
      item.setAttribute('id', eId)
      item.setAttribute('draggable', true)
      item.appendChild(img)
      item.appendChild(label)
      output.appendChild(item)

      window.addEventListener("DOMContentLoaded", () => {
        // Get the element by id
        const element = id(eId)
        // Add the ondragstart event listener
        element.addEventListener("dragstart", dragstartHandler);
      })
      n++
    })
  console.log('done')
  })
}

listFiles(dataDir, photoList)
