// import _ from 'lodash'
import { BrowserWindow, BrowserWindowConstructorOptions, BrowserView, Rectangle, app } from 'electron'
import { defaultWinOptions } from '../../consts/ipc'

interface Windows {
    [key: string]: {
        window: Electron.BrowserWindow,
        options: CreateWinOpts
    }
}

interface CreateWinOpts {
    key: string,
    browserWindowConstructorOptions?: BrowserWindowConstructorOptions,
    openDevTools?: boolean,
    preventOriginClose?: boolean
}

class WindowsManager {
    windows: Windows = {}
    /**
     * @param createWinOpts 窗口创建选项
     */
    createWin(baseUrl: string, createWinOpts: CreateWinOpts) {
        const {
            key,
            openDevTools = true,
            preventOriginClose = false,
            browserWindowConstructorOptions = defaultWinOptions
        } = createWinOpts
        if (this.windows[key]) {
            // 窗口已存在，聚焦
            this.windows[key].window.focus()
            return this.windows[key].window
        }
        const window = new BrowserWindow(browserWindowConstructorOptions)
        window.on("close", e => {
            if (preventOriginClose) {
                e.preventDefault()
                return
            }
        })
        window.loadURL(baseUrl + (key === "main" ? "" : (app.isPackaged ? key : `/${key}`)))
        window.on("closed", () => {
            delete this.windows[key]
        })
        window.on("ready-to-show", () => {
            if (openDevTools) {
                window.webContents.openDevTools()
            }
        })
        this.windows[key] = {
            window,
            options: createWinOpts
        }
        return window
    }
    /**
     * 可以向当前窗口添加额外视图
     * @param window 窗口
     * @param loadURL 视图的来源
     */
    addBroswerView(window: Electron.BrowserWindow, loadURL: string, position?: Rectangle) {
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
                window.removeBrowserView(broswerView)
            }
        }
        window.webContents.on("render-process-gone", onfailure)
        window.webContents.on("unresponsive", onfailure)
        window.webContents.on("did-finish-load", onfailure)
    }

    /**
     * 获取窗口
     * @param key 窗口唯一key
     * @returns 窗口，有可能为null
     */
    getWin(key: string) {
        const window = this.windows[key]
        if (!window) {
            return null
        }
        return window.window
    }
    /**返回所有的窗口及配置项 */
    getAllWins() {
        return this.windows
    }
}

export default WindowsManager