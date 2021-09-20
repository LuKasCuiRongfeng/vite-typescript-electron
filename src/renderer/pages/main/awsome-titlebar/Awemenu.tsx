import React from "react";
import { Menu, Dropdown } from 'antd'
import { ipc } from "src/renderer/core/ipc";
import { AweMenuItem } from "./tool";
import './index.less'

export default function Awemenu(props: { template: AweMenuItem[], height?: number, theme: "dark" | "light" }) {
    const { template, theme } = props

    const overlay = (submenu: AweMenuItem[]) => {
        const getSubmenu = (item: AweMenuItem) => {
            if (item.submenu) {
                return <Menu.SubMenu key={item.label} title={item.label} popupClassName={`ant-dropdown-menu-submenu-popup-${theme}`}>
                    {
                        item.submenu.map(_item => getSubmenu(_item))
                    }
                </Menu.SubMenu>
            } else {
                return <Menu.Item key={item.label}>
                    <div>
                        {item.label}
                        <span className="windows-icon">{item.windowsIcon}</span>
                    </div>
                </Menu.Item>
            }
        }
        return (
            <Menu 
            onClick={params => onClickMenu(params.key)}>
                {
                    submenu.map(item => getSubmenu(item))
                }
            </Menu>
        )
    }

    const onClickMenu = (key: string) => {
        ipc.send("CUSTOM_MENU_EVENT", key)
    }

    const getMenu = (item: AweMenuItem) => {
        return (
            item.submenu ? (
                <Dropdown
                    key={item.label}
                    overlay={overlay(item.submenu)}
                    trigger={["click"]}
                    overlayClassName={`awe-ant-dropdown-${theme}`}
                >
                    <div tabIndex={1} className="awesome-menu-item">{item.label}</div>
                </Dropdown>
            ) : (
                <div key={item.label} tabIndex={1} className="awesome-menu-item">{item.label}</div>
            )
        )
    }

    return (
        <div className="awesome-menu">
            {
                template.map(menu => (
                    getMenu(menu)
                ))
            }
        </div>
    )
}