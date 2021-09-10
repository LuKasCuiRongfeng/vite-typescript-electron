import { app } from 'electron'
import { join } from 'path'
import { config } from 'dotenv'

config()

/** 是否是开发环境 */
export function isDev() {
    return !app.isPackaged
}