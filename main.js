const {app, BrowserWindow} = require('electron')
const isDev  = require('electron-is-dev')
let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1100, 
        height: 800,
        webPreferences:{
            contextIsolation:false, 
            nodeIntegration:true
        }
    })
    const urlLocation = isDev ? 'http://localhost:3000' : 'http://endtheme.cn'
    mainWindow.loadURL(urlLocation)
})