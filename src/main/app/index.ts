// 代表当前的应用
import WindowsManager from "../class/WindowsManager";
import WindowsMenu from "../class/WindowsMenu";

const windowsManager = new WindowsManager()
const windowsMenu = new WindowsMenu()

class App {
    windowsManager = windowsManager
    windowsMenu = windowsMenu
    /**你必须先调用此方法才可以使用app的所以功能 */
    initApp() {
        this.windowsMenu.init()
        console.log(this.windowsMenu.getMenu()?.items)
    }
}


export default App

export type {
    App
}