import { MenuItemConstructorOptions, app, shell } from "electron";

const isMac = process.platform === "darwin"

const macTemplate: MenuItemConstructorOptions[] = [
    // { role: 'appMenu' }
    {
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    },
    // { role: 'fileMenu' }
    {
        label: 'File',
        submenu: [
            { role: 'close' }
        ]
    },
    // { role: 'editMenu' }
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
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
    // { role: 'viewMenu' }
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forceReload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    // { role: 'windowMenu' }
    {
        label: 'Window',
        submenu: [
            { role: 'minimize' },
            { role: 'zoom' },
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click: async () => {
                    await shell.openExternal('https://electronjs.org')
                }
            }
        ]
    }
]

const winOrLinuxTemplate: MenuItemConstructorOptions[] = [
    // { role: 'fileMenu' }
    {
        label: '文件',
        submenu: [
            { role: 'quit', label: "关闭", id: "文件-关闭" },
            {
                label: "hello",
                toolTip: "你好",
                id: "hello",
                click: (item, win, e) => {
                    console.log(item, win)
                }
            }
        ],
        id: "File"
    },
    // { role: 'editMenu' }
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
    // { role: 'viewMenu' }
    {
        label: '视图',
        submenu: [
            { role: 'reload', label: "重新加载" },
            { role: 'forceReload', label: "强制加载" },
            { role: 'toggleDevTools', label: "切换开发者工具" },
            { type: 'separator' },
            { role: 'resetZoom', label: "恢复窗口" },
            { role: 'zoomIn', label: "缩小" },
            { role: 'zoomOut', label: "放大" },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    // { role: 'windowMenu' }
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
            {
                label: '更多',
                click: async () => {
                    await shell.openExternal('https://electronjs.org')
                }
            }
        ]
    }
]

export const menuTemplate = isMac ? macTemplate : winOrLinuxTemplate