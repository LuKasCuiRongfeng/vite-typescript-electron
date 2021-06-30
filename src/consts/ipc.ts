import { Rectangle } from 'electron'
import { CreateWinOpts } from '../main/class/WindowsManager'

// 所有的ipctype
export const SEND_MSG = "SEND_MSG"
export const CREATE_WIN = "CREATE_WIN"
export const CREATE_VIEW = "CREATE_VIEW"

export type IpcType = "SEND_MSG" | "CREATE_WIN" | "CREATE_VIEW"
export type IpcData = { key: string, data: { type: string, payload: any } }
    | CreateWinOpts | { key: string, loadUrl: string, position?: Rectangle }

export type ElectronRectangle = Rectangle