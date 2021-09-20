import React from 'react'
import { useAppDispatch, useAppSelector } from 'renderer/store/hooks'
import { ipc } from 'src/renderer/core/ipc'
import { request } from 'src/renderer/core/service'
import AwesomeTitlebar from './awsome-titlebar'
import { menuTemplate } from './menuTemplate'
import './index.less'

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
        const res = await request({
            params: {
                name: "crf",
                age: 12
            }
        })
        if (res.status === 200) {
            console.log(res)
        }
    }
    return (
        <div>
            <AwesomeTitlebar theme="dark" template={menuTemplate} />
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
        </div>
    )
}


export default Main