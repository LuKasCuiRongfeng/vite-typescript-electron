import React from "react";
import { ipc } from "src/renderer/core/ipc";
import './index.less'

const controls = [
    { label: "最小化", icon: "－" },
    { label: "最大化", icon: "▢" },
    { label: "关闭", icon: "×" }
]

export default function WindowsControl() {
    const onClickControl = (label: string) => {
        ipc.send("CUSTOM_WINDOWS_CONTROL", label)
    }
        
    return (
        <div className="windows-control">
            {
                controls.map(item => (
                    <div key={item.label} className="windows-control-item" onClick={() => onClickControl(item.label)}>{item.icon}</div>
                ))
            }
        </div>
    )
}