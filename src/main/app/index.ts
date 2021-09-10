// 代表当前的应用
import { Url } from "../core/url";
import { WindowManager } from "main/core/window-manager";
import { WindowMenu } from "../core/window-menu";
import { registerIPCEvent } from "../core/ipc";
import { Accelerator } from "../core/accelerator";
import { createMainWin } from "../windows/main";

export class App {
    url = new Url(this)
    accelerator = new Accelerator(this)
    windowManager = new WindowManager(this)
    windowMenu = new WindowMenu(this)
    async initApp() {
        registerIPCEvent(this)
        await createMainWin(this)
    }
}