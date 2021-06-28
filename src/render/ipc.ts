import { SEND_MSG } from '../consts/ipc'
// import { ipcRenderer } from 'electron'
import store from './store/index'
import { ipcRenderer } from './utils'

ipcRenderer.on(SEND_MSG, (e, args) => {
    store.dispatch(args)
})