import { Rectangle } from 'electron'

export type ElectronRectangle = Rectangle

export enum IpcType {
    SEND_MSG = "SEND_MSG",
    CREATE_WIN = "CREATE_WIN",
    CREATE_VIEW = "CREATE_VIEW"
}

export type IpcData =
    { key: string, data: { type: string, paylaod: any } } |
    { key: string, loadUrl: string, position?: Rectangle }