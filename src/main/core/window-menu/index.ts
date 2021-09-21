import { Menu } from 'electron'
import { App } from 'src/main/app'
import { menuTemplate } from './menu'

export class WindowMenu {

    constructor(public myApp: App) {
        this.init()
    }

    init() {
        const menu = Menu.buildFromTemplate(menuTemplate(this.myApp))
        Menu.setApplicationMenu(menu)
    }
    getMenu() {
        return Menu.getApplicationMenu()
    }
    poContextmenu() {
        this.getMenu()?.popup()
    }
}