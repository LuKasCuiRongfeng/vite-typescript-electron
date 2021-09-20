export interface AweMenuItem {
    /** 标签 */
    label: string,
    /** 根基菜单？ */
    root?: boolean,
    /** 子菜单 */
    submenu?: AweMenuItem[],
    /** windows平台下的快捷键显示 */
    windowsIcon?: string
}