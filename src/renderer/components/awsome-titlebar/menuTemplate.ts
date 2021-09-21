
import { AweMenuItem } from './tool'

export const menuTemplate: AweMenuItem[] = [
    {
        label: "文件",
        root: true,
        submenu: [
            {
                label: "退出",
                windowsIcon: "Ctrl+Q"
            }
        ]
    },
    {
        label: "视图",
        submenu: [
            {
                label: "主题",
                submenu: [
                    {
                        label: "theme-dark",
                        windowsIcon: "Ctrl+Shift+D"
                    },
                    {
                        label: "theme-light",
                        windowsIcon: "Ctrl+Shift+L"
                    }
                ]
            }
        ]
    }
]