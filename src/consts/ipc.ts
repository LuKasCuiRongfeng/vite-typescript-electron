import { BrowserWindowConstructorOptions } from 'electron'

export const SEND_MSG = "SEND_MSG"
export const CREATE_WIN = "CREATE_WIN"

export interface Opts {
    data?: { type: string, payload: any },
    winOpts?: BrowserWindowConstructorOptions,
    beforeClosed?: (remote: Electron.Remote) => void
}

