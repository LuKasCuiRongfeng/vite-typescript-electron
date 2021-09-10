import { BrowserWindow, BrowserWindowConstructorOptions, BrowserView, Rectangle, app } from 'electron'
import { App } from 'main/app'
import { IpcType } from 'src/consts/ipc'


export const defaultWinOptions: BrowserWindowConstructorOptions = {
    width: 700,
    height: 700,
    webPreferences: {
        enableRemoteModule: true,
        nodeIntegration: true,
        contextIsolation: false
    }
}

export interface WinOptions {
    /** 窗口唯一标识，和路由对应 */
    key: string,
    /** 是否向新窗口传送值 */
    data?: { type: string, payload: any },
    /** 禁用默认的关闭行为 */
    preventOriginClose?: boolean,
    /** 是否打开开发者工具 */
    openDevTools?: boolean,
    /** electron 窗口选项 */
    browserWindowConstructorOptions?: BrowserWindowConstructorOptions,
}

export class WindowManager {
    windows: Map<string, BrowserWindow> = new Map()
    constructor(public myApp: App) { }
    /**
     * @param winOptions 窗口创建选项
     */
    createWin(winOptions: WinOptions) {
        const {
            key,
            data,
            openDevTools = true,
            preventOriginClose = false,
            browserWindowConstructorOptions = {}
        } = winOptions
        let window = this.windows.get(key)
        if (window) {
            // 窗口已存在，聚焦
            window.focus()
            return window
        }
        window = new BrowserWindow({ ...defaultWinOptions, ...browserWindowConstructorOptions })
        this.windows.set(key, window)

        window.on("close", e => {
            if (preventOriginClose) {
                e.preventDefault()
                return
            }
        })
        window.loadURL(this.myApp.url.getLoadUrl(key))
        window.on("closed", () => {
            this.windows.delete(key)
        })
        window.on("ready-to-show", () => {
            if (openDevTools) {
                window?.webContents.openDevTools()
            }
            if (data) {
                // 如果data存在，则向窗口传值
                this.sendMsg(key, data)
            }
        })
        return window
    }
    /**
     * 可以向当前窗口添加额外视图
     * @param key 窗口唯一key
     * @param loadURL 视图的来源
     * @param position 视图位置
     */
    addBroswerView(key: string, loadURL: string, position?: Rectangle) {
        const window = this.windows.get(key)
        if (!window) return
        const broswerView = new BrowserView()
        window.setBrowserView(broswerView)
        broswerView.setBounds(Object.assign({
            x: 0,
            y: 0,
            width: window.getSize()[0] / 2,
            height: window.getSize()[1] / 2
        }, (position || {})))
        broswerView.webContents.loadURL(loadURL)

        const onfailure = () => {
            if (broswerView.webContents && !broswerView.webContents.isDestroyed()) {
                window?.removeBrowserView(broswerView)
            }
        }
        window.webContents.on("render-process-gone", onfailure)
        window.webContents.on("unresponsive", onfailure)
        window.webContents.on("did-finish-load", onfailure)
    }

    /** 可以跨窗口传数据 */
    sendMsg(key: string, data: { type: string, payload: any }) {
        const window = this.windows.get(key)
        if (!window) return
        window.webContents.send(IpcType.SEND_MSG, data)
    }

    /** 获取焦点窗口 */
    getFocusWin() {
        return [...this.windows.values()].find(win => win.isFocused())
    }

    /**
     * 获取窗口
     * @param key 窗口唯一key
     * @returns 窗口，有可能为null
     */
    getWin(key: string) {
        return this.windows.get(key)
    }
    /**返回所有的窗口及配置项 */
    getAllWins() {
        return [...this.windows.values()]
    }

    /** 删除窗口 */
    destroy(key: string) {
        const window = this.windows.get(key)
        if (window) {
            window.destroy()
            this.windows.delete(key)
        }
    }
}