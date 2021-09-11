import { App } from "../app";

const urls = ["http://localhost:8000/*"]

export async function createMainWin(myApp: App) {
    const win = myApp.windowManager.createWin({
        key: "main",
        openDevTools: false
    })

    const webrequest = win.webContents.session.webRequest
    webrequest.onBeforeSendHeaders({ urls }, (details, cb) => {
        const { url, requestHeaders } = details
        console.log("req: ", details)
        cb({ requestHeaders })
    })
    webrequest.onHeadersReceived({ urls }, (details, cb) => {
        const { url, responseHeaders } = details
        console.log("res: ", details)
        cb({ responseHeaders })
    })
    return win
}