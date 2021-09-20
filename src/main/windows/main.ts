import { IpcType } from "src/consts/ipc";
import { App } from "../app";

const urls = ["http://localhost:8000/*"]

export async function createMainWin(myApp: App) {
    const win = myApp.windowManager.createWin({
        key: "main",
        openDevTools: true,
        browserWindowConstructorOptions: {
            frame: false,
            width: 1500
        }
    })

    return win
}