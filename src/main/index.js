'use strict'

import { app, BrowserWindow, globalShortcut } from 'electron'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    frame: false,
    transparent: true,
    titleBarStyle: 'hidden',
    minWidth: 630,
    minHeight: 100,
    fullscreenable: false,
    fullscreen: false
  })

  mainWindow.setIgnoreMouseEvents(false, {forward: true})
  mainWindow.setAlwaysOnTop(true)
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  globalShortcut.register('CommandOrControl+Alt+Y', () => {
    mainWindow.webContents.send('top')
  })

  globalShortcut.register('CommandOrControl+Alt+X', () => {
    mainWindow.webContents.send('view')
  })

  globalShortcut.register('CommandOrControl+Alt+C', () => {
    mainWindow.webContents.send('mouse')
  })

  globalShortcut.register('CommandOrControl+Alt+V', () => {
    mainWindow.webContents.send('dev')
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
