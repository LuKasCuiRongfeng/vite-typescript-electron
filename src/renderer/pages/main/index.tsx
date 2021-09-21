import React from 'react'
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks'
import { ipc } from 'src/renderer/core/ipc'
import { request } from 'src/renderer/core/service'
import AwesomeTitlebar from 'renderer/components/awsome-titlebar'
import { menuTemplate } from 'renderer/components/awsome-titlebar/menuTemplate'
import icon from './porn.png'
import './index.less'

window.addEventListener("contextmenu", () => {
    ipc.send("POP_CONTEXT_MENU", "")
})

window.name = "crf"

function Main() {
    const dispatch = useAppDispatch()
    const value = useAppSelector(state => state.main.value)

    const openView = () => {
        ipc.send("CREATE_VIEW", {
            key: "main",
            loadUrl: "https://www.bilibili.com"
        })
    }
    const openDetail = () => {
        ipc.send("CREATE_WIN", {
            key: "detail"
        })
    }
    const getData = async () => {
        window.theme = Date.now().toString()
        window.name = Date.now().toString()
    }
    return (
        <div>
            <AwesomeTitlebar theme="dark" template={menuTemplate} icon={icon} />
            <div>{value}</div>
            <button onClick={() => {
                dispatch({
                    type: "main/increment",
                    payload: 23
                })
            }}>add value</button>
            <button onClick={openView}>view</button>
            <button onClick={openDetail}>open detail</button>
            <button onClick={getData}>get data</button>
            <button>{window.theme}</button>
        </div>
    )
}


export default Main