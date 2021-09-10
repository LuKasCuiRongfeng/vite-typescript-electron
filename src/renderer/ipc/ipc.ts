import { IpcData, IpcType } from 'src/consts/ipc'
import store from '../store/index'
const { ipcRenderer } = require('electron')

ipcRenderer.on(IpcType.SEND_MSG, (e, args) => {
    store.dispatch(args)
})

type _IpcType = keyof typeof IpcType

export const ipc = {
    send(channel: _IpcType, args: IpcData) {
        ipcRenderer.send(channel, args)
    },
    invoke(channel: _IpcType, args?: IpcData) {
        return ipcRenderer.invoke(channel, args)
    }
}