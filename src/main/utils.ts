import { app } from 'electron'
import { join } from 'path'
import { config } from 'dotenv'
import { SEND_MSG } from '../consts/ipc'

config()

const baseUrl = app.isPackaged
    ? join(__dirname, "../../dist/render/html#")
    : `http://localhost:${process.env.PORT}/#`

function sendMsg(key: string, data: any) {
    let win = global.win[key]
    win?.webContents.send(SEND_MSG, data)
}

function getBaseUrl() {
    return baseUrl
}


export {
    sendMsg,
    getBaseUrl
}