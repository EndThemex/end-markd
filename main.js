const {app, BrowserWindow, ipcMain} = require('electron')
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
    //require('@electron/remote/main').initialize()
    //require("@electron/remote/main").enable(mainWindow.webContents)
    
    ipcMain.handle('electron-app-get-path', async (event, path) => {
        return app.getPath(path)
    })
    const urlLocation = isDev ? 'http://localhost:3000' : 'http://endtheme.cn'
    mainWindow.loadURL(urlLocation)
})