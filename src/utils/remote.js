// let electronRemote = window.require('@electron/remote')
const {ipcRenderer} = window.require('electron')

// console.time('time::getPath using remote')
// const userData = electronRemote.app.getPath('userData')
// const home = electronRemote.app.getPath('home')
// const desktop = electronRemote.app.getPath('desktop')
// const downloads = electronRemote.app.getPath('downloads')
// const documents = electronRemote.app.getPath('documents')
// console.log(documents);
// const pictures = electronRemote.app.getPath('pictures')
// const videos = electronRemote.app.getPath('videos')
// const music = electronRemote.app.getPath('music')
// console.timeEnd('time::getPath using remote')

async function getPath(localPath) {
  return await ipcRenderer.invoke('electron-app-get-path', localPath)
}


export default getPath;