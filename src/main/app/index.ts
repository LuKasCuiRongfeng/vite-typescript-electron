// 代表当前的应用
import { Url } from "../core/url";
import { WindowManager } from "main/core/window-manager";
import { WindowMenu } from "../core/window-menu";
import { registerIPCEvent } from "../core/ipc";
import { Accelerator } from "../core/accelerator";
import { createMainWin } from "../windows/main";
import { Service } from "../core/service";

export class App {
    url = new Url(this)
    windowManager = new WindowManager(this)
    accelerator = new Accelerator(this)
    windowMenu = new WindowMenu(this)
    service = new Service(this)
    async initApp() {
        registerIPCEvent(this)
        await createMainWin(this)
    }
}