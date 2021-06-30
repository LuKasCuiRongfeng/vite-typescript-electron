import { Menu } from 'electron'
import { menuTemplate } from './extra'

class WindowsMenu {
    isInitMenu: boolean = false

    init() {
        const menu = Menu.buildFromTemplate(menuTemplate)
        Menu.setApplicationMenu(menu)
        this.isInitMenu = true
    }
    getMenu() {
        if (!this.isInitMenu) return
        return Menu.getApplicationMenu()
    }
}



export default WindowsMenu