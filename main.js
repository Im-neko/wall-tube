// TODO: 読み込み方バラバラでキモいのでそのうち直す
const updater = require('./auto-update');
const electron = require('electron');
const { ipcMain } = require('electron');

const app = electron.app
const BrowserWindow = electron.BrowserWindow



app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {

  let mainWindow = new BrowserWindow({
    frame: false,
    transparent: true,
    resizable: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL('file://' + __dirname + '/index.html')
  // mainWindow.openDevTools(); 
  mainWindow.on('closed', function() {
    mainWindow = null
    app.quit();
  });

  ipcMain.on('loadStatus', (event, arg) => {
    mainWindow.setIgnoreMouseEvents(arg);
    mainWindow.maximize();
  });

});

