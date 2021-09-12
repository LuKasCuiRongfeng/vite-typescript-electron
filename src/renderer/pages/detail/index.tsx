import React from "react"
import { ipc } from "src/renderer/core/ipc"
import { request } from "src/renderer/core/service"


export default function Detail() {

    const get = () => {
        request({})
    }

    return (
        <div>
            <h1>detail</h1>
            <button onClick={get}>detail 请求一次看看</button>
        </div>
    )
}