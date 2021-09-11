import React from "react"
import { ipc } from "src/renderer/core/ipc"


export default function Detail() {

    const get = () => {
        ipc.invoke("API_REQUEST", {
            url: "http://localhost:8000"
        })
    }

    return (
        <div>
            <h1>detail</h1>
            <button onClick={get}>detail 请求一次看看</button>
        </div>
    )
}