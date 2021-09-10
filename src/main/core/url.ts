import { config } from 'dotenv'
import { join } from 'path'
import { App } from 'main/app'
import { isDev } from 'src/main/utils/tools'

config()

export class Url {

    constructor(public app: App) {}

    /**
     * 获取窗口加载的地址
     * @param key 窗口的key
     */
    getLoadUrl(key: string) {
        const _isDev = isDev()
        const _key = key === "main" ? "" : key
        if (_isDev) {
            return `http://localhost:${process.env.PORT}/#/${_key}`
        }
        return join(`file://`, process.cwd(), `dist/renderer/index.html#${_key}`)
    }
}