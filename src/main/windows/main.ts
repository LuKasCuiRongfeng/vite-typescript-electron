import { App } from "../app";

export async function createMainWin(myApp: App) {
    const win = myApp.windowManager.createWin({
        key: "main",
        openDevTools: false
    })




    return win
}