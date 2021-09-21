import { MenuItemConstructorOptions, app, shell } from "electron";
import { App } from "src/main/app";

const isMac = process.platform === "darwin"

export function menuTemplate(myApp: App) {
    const macTemplate: MenuItemConstructorOptions[] = [
        {
            label: app.name,
            submenu: [
                { role: 'about', label: "关于" },
                { type: 'separator' },
                { role: 'services', label: "服务" },
                { type: 'separator' },
                { role: 'hide', label: "隐藏" },
                { role: 'unhide', label: "显示" },
                { type: 'separator' },
                { role: 'quit', label: "退出" }
            ]
        },
        {
            label: '文件',
            submenu: [
                { role: 'close', label: "关闭" }
            ]
        },
        {
            label: '编辑',
            submenu: [
                { role: 'undo', label: "撤销" },
                { role: 'redo', label: "重做" },
                { type: 'separator' },
                { role: 'cut', label: "剪切" },
                { role: 'copy', label: "复制" },
                { role: 'paste', label: "粘贴" },
                { role: 'pasteAndMatchStyle' },
                { role: 'delete', label: "删除" },
                { role: 'selectAll', label: "全选" },
                { type: 'separator' },
                {
                    label: 'Speech',
                    submenu: [
                        { role: 'startSpeaking' },
                        { role: 'stopSpeaking' }
                    ]
                }
            ]
        },
        {
            label: '视图',
            submenu: [
                { role: 'reload', label: "重新加载" },
                { role: 'forceReload', label: "强制重新加载" },
                { role: 'toggleDevTools', label: "切换开发者工具" },
                { type: 'separator' },
                { role: 'resetZoom', label: "重置缩放" },
                { role: 'zoomIn', label: "缩小" },
                { role: 'zoomOut', label: "放大" },
                { type: 'separator' },
                { role: 'togglefullscreen', label: "切换全屏" }
            ]
        },
        // { role: 'windowMenu' }
        {
            label: '窗口',
            submenu: [
                { role: 'minimize', label: "最小化" },
                { role: 'zoom', label: "最大化" },
                { type: 'separator' },
                { role: 'front' },
                { type: 'separator' },
                { role: 'window' }
            ]
        },
        {
            role: 'help',
            label: "帮助",
            submenu: [
                {
                    label: '了解更多',
                    click: async () => {
                        await shell.openExternal('https://electronjs.org')
                    }
                }
            ]
        }
    ]

    const winOrLinuxTemplate: MenuItemConstructorOptions[] = [
        {
            label: '文件',
            submenu: [
                { role: 'close', label: "关闭" }
            ]
        },
        {
            label: '编辑',
            submenu: [
                { role: 'undo', label: "撤销" },
                { role: 'redo', label: "重做" },
                { type: 'separator' },
                { role: 'cut', label: "剪切" },
                { role: 'copy', label: "复制" },
                { role: 'paste', label: "粘贴" },
                { role: 'delete', label: "删除" },
                { type: 'separator' },
                { role: 'selectAll', label: "全选" }
            ]
        },
        {
            label: '视图',
            submenu: [
                { role: 'reload', label: "重新加载" },
                { role: 'forceReload', label: "强制重新加载" },
                { role: 'toggleDevTools', label: "切换开发者工具" },
                { type: 'separator' },
                { role: 'resetZoom', label: "重置缩放" },
                { role: 'zoomIn', label: "缩小" },
                { role: 'zoomOut', label: "放大" },
                { type: 'separator' },
                { role: 'togglefullscreen', label: "切换全屏" }
            ]
        },
        {
            label: '窗口',
            submenu: [
                { role: 'minimize', label: "最小化" },
                { role: 'zoom', label: "最大化" },
                { role: 'close', label: "关闭" }
            ]
        },
        {
            role: 'help',
            label: "帮助",
            submenu: [
                {...myApp.accelerator.registerMenu("切换开发者工具")},
                {
                    label: '更多',
                    click: async () => {
                        await shell.openExternal('https://electronjs.org')
                    }
                }
            ]
        }
    ]
    return isMac ? macTemplate : winOrLinuxTemplate
}