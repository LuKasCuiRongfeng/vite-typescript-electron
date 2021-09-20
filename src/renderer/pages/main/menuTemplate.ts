
import { AweMenuItem } from './awsome-titlebar/tool'

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
    }
]