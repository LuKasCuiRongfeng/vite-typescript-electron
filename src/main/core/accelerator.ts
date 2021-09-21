import { app, globalShortcut } from "electron";
import { App } from "../app";
import { isDev } from "../utils/tools";


interface _Accelerator {
    label?: string,
    accelerator: Electron.Accelerator,
    /** 快捷键行为 */
    click: () => void
}
/** 快捷键分为菜单快捷键和全局快捷键，
 * 全局快捷键最好在退出时取消注册，也可以没这个必要
 * 注意，自定义windows菜单的时候没办法沿用那些具备role
 * 的菜单，只得自己编程实现
 * */
export class Accelerator {

    constructor(public myApp: App) {
        this.init()
    }

    /** 全局快捷键不需要label，在app退出前始终有效，别乱设，以免和其他程序相互影响 */
    globalAccelerator(): _Accelerator[] {
        const myApp = this.myApp
        return []
    }

    /** 菜单快捷键在程序激活时才有效 */
    menuAccelerator(): _Accelerator[] {
        const myApp = this.myApp
        return [
            {
                label: "切换开发者工具",
                accelerator: "CommandOrControl+Shift+I",
                click() {
                    myApp.windowManager.getFocusWin()?.webContents.toggleDevTools()
                }
            },
            {
                label: "退出",
                accelerator: "CmdOrCtrl+Q",
                click() {
                    app.quit()
                }
            },
            {
                label: "theme-dark",
                accelerator: "CmdOrCtrl+Shift+D",
                click() {
                    
                }
            },
            {
                label: "theme-light",
                accelerator: "CmdOrCtrl+Shift+L",
                click() {
                    app.quit()
                }
            }
        ]
    }

    init() {
        this.globalAccelerator().forEach(acce => {
            globalShortcut.register(acce.accelerator, acce.click)
        })
        app.on("before-quit", () => {
            globalShortcut.unregisterAll()
        })
    }

    /** 为了避免在menu里再写一次 */
    registerMenu(label: string) {
        const match = this.menuAccelerator().find(acce => acce.label === label)
        let registerAccelerator = true
        if (!isDev() && label === "切换开发者工具") {
            registerAccelerator = false
        }
        if (match) {
            return {
                label,
                accelerator: match.accelerator,
                registerAccelerator: registerAccelerator,
                click: match.click
            }
        }
        return {
            label: "菜单没有注册"
        }
    }

    /** 从自定义菜单响应 */
    callclickByCustomMenu(label: string) {
        const click = this.menuAccelerator().find(accelerator => accelerator.label === label)?.click
        click && click()
    }
}