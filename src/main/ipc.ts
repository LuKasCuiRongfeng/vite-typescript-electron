import { ipcMain } from 'electron'
import { sendMsg, getBaseUrl } from './utils'
import { SEND_MSG, CREATE_WIN } from '../consts/ipc'
import { App } from './app'



/**
 * 注册所有的ipc事件
 */
export function registerIPCEvent(myApp: App) {
    ipcMain.on(SEND_MSG, (e, args) => {
        const { key, data } = args
        sendMsg(key, data)
    })

    ipcMain.on(CREATE_WIN, (e, args) => {
        const { key, data } = args
        myApp.windowManager?.createWin(getBaseUrl(), {
            key
        })
        if (data) {
            sendMsg(key, data)
        }
    })
}