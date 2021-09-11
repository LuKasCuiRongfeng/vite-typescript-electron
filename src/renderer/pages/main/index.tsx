import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'renderer/store/hooks'
import { ipc } from 'src/renderer/core/ipc'
import './index.css'

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
        // fetch("http://localhost:8000").then(res => res.json())
        // .then(res => { console.log(res) })
        const res = await ipc.invoke("API_REQUEST", {
            url: "http://localhost:8000",
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            params: JSON.stringify({ name: "crf", age: 12 })
        })
        console.log(res)
    }
    return (
        <div>
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