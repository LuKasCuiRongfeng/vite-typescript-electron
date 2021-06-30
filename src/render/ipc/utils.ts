import { IpcData, IpcType } from '../../consts/ipc'
import { ipcRenderer } from './ipc'

/**
 * ipc通信通用函数，请自行把type和对应的数据对应好
 * @param ipcParams 参数
 */
function ipc(ipcParams: { type: IpcType, data: IpcData }) {
    ipcRenderer.send(ipcParams.type, ipcParams.data)
}


export {
    ipc
}