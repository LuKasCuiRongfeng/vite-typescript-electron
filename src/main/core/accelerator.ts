import { globalShortcut } from "electron";
import { App } from "../app";
import { isDev } from "../utils/tools";


interface _Accelerator {
    label: string,
    accelerator: Electron.Accelerator,
    listener: () => void
}

export class Accelerator {

    constructor(public myApp: App) {
        this.init()
    }

    getAccelerators(): _Accelerator[] {
        const myApp = this.myApp
        return [
            {
                label: "切换开发者工具",
                accelerator: "CommandOrControl+Shift+I",
                listener() {
                   myApp.windowManager.getFocusWin()?.webContents.toggleDevTools() 
                }
            }
        ]
    }

    init() {
        this.getAccelerators().forEach(acce => {
            let listener = acce.listener
            if (!isDev() && acce.label === "切换开发者工具") {
                listener = () => {}
            }
            globalShortcut.register(acce.accelerator, listener)
        })
    }

    /** 为了避免在menu里再写一次 */
    matchMenu(label: string) {
        const match = this.getAccelerators().find(acce => acce.label === label)
        console.log(match)
        if (match) {
            return {
                label,
                accelerator: match.accelerator,
                click: match.listener
            }
        }
        return {
            label: "菜单没有注册"
        }
    }
}