import { ipcMain } from 'electron'
import { getBaseUrl } from './utils'
import { SEND_MSG, CREATE_WIN, CREATE_VIEW } from '../../consts/ipc'
import { App } from '../app'



/**
 * 注册所有的ipc事件
 */
export function registerIPCEvent(myApp: App) {
    ipcMain.on(SEND_MSG, (e, args) => {
        const { key, data } = args
        myApp.windowsManager?.sendMsg(key, data, SEND_MSG)
    })

    ipcMain.on(CREATE_WIN, (e, args) => {
        myApp.windowsManager?.createWin(getBaseUrl(), args)
    })

    ipcMain.on(CREATE_VIEW, (e, args) => {
        const { key, loadURL, position } = args
        myApp.windowsManager?.addBroswerView(key, loadURL, position)
    })
}