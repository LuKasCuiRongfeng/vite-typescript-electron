import { app, BrowserWindow, net } from 'electron'
import { App } from './app'
import { registerIPCEvent } from './core/ipc'
import { createMainWin } from './windows/main'




let mainWin: Electron.BrowserWindow

app.whenReady().then(() => {
  const myApp = new App()
  myApp.initApp()
  app.on('activate', async function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWin = await createMainWin(myApp)
    }
  })
  makeSingleInstance()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

function makeSingleInstance() {
  if (process.mas) return
  const gotLock = app.requestSingleInstanceLock()
  if (!gotLock) {
    app.quit()
  } else {
    app.on('second-instance', () => {
    })
  }
}