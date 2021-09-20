import React, { useEffect, useMemo, useState } from "react";
import { ipc } from "src/renderer/core/ipc";
import Awemenu from './Awemenu'
import './index.less'
import { AweMenuItem } from "./tool";
import WindowsControl from "./WindowControl";

interface Props {
    className?: string,
    style?: React.CSSProperties,
    icon?: string,
    title?: string,
    template: AweMenuItem[],
    height?: number,
    theme?: "light" | "dark",
    selectTheme?: string
}

export default function AwesomeTitlebar(props: Props) {
    const [platform, setPlatform] = useState("win32")
    useEffect(() => {
        ipc.invoke("GET_PLATFORM").then(res => {
            if (res !== "win32") {
                setPlatform("no-win32")
            }
        })
    }, [])
    const { className, style, template, height = 30, theme = "dark" } = props
    return (
        <div className={`theme-${theme} awesome-titlebar ${platform}-style ${className}`} style={{ height: height, ...style }}>
            {
                platform === "win32" ? (
                    <>
                        <Awemenu template={template} height={height} theme={theme} />
                        <WindowsControl />
                    </>
                ) : ""
            }
        </div>
    )
}