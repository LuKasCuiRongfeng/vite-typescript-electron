import { globalShortcut } from "electron";
import { App } from "../app";


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
        return [
            {
                label: "退出",
                accelerator: "CommandOrCtrl+Alt+Q",
                listener() {

                }
            }
        ]
    }

    init() {
        this.getAccelerators().forEach(acce => {
            globalShortcut.register(acce.accelerator, acce.listener)
        })
    }

    /** 为了避免在menu里再写一次 */
    matchMenu(label: string) {
        const match = this.getAccelerators().find(acce => acce.label === label)
        if (match) {
            return {
                label,
                accelerator: match.accelerator,
                click: match.listener
            }
        }
        return {}
    }
}