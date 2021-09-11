import { ipcMain, net } from 'electron'
import { IpcType } from 'src/consts/ipc'
import { App } from '../app'



/**
 * 注册所有的ipc事件
 */
export function registerIPCEvent(myApp: App) {
    ipcMain.on(IpcType.SEND_MSG, (e, args) => {
        const { key, data } = args
        myApp.windowManager.sendMsg(key, data)
    })

    ipcMain.on(IpcType.CREATE_WIN, (e, args) => {
        myApp.windowManager.createWin(args)
    })

    ipcMain.on(IpcType.CREATE_VIEW, (e, args) => {
        const { key, loadUrl, position } = args
        myApp.windowManager.addBroswerView(key, loadUrl, position)
    })

    ipcMain.handle(IpcType.API_REQUEST, async (e, args) => {
        const { url, params, headers, method } = args
        const res = await myApp.service.request({
            url,
            headers,
            params,
            method
        })
        return res
    })
}