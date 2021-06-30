// Modules to control application life and create native browser window
import { app, BrowserWindow } from 'electron'
import { getBaseUrl } from './utils/utils'
import { registerIPCEvent } from './utils/ipc'
import App from './app'


const myApp = new App()

let mainWin: Electron.BrowserWindow

app.whenReady().then(() => {
  myApp.initApp()
  mainWin = myApp.windowsManager?.createWin(getBaseUrl(), {
    key: "main",
    openDevTools: true,
    preventOriginClose: false,
    browserWindowConstructorOptions: {
      title: "main"
    }
  })
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWin = myApp.windowsManager?.createWin(getBaseUrl(), {
        key: "main",
        openDevTools: true,
        preventOriginClose: false,
        browserWindowConstructorOptions: {
          title: "main"
        }
      })
    }
  })


  registerIPCEvent(myApp)
  makeSingleInstance()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
// 该方法保证只有一个app实例
function makeSingleInstance() {
  if (process.mas) return

  const gotLock = app.requestSingleInstanceLock()
  if (!gotLock) {
    app.quit()
  } else {
    app.on('second-instance', () => {
      if (mainWin) {
        if (mainWin.isMinimized()) mainWin.restore()
        mainWin.focus()
      }
    })
  }
}
