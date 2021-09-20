import React, { useEffect } from "react"
import { ipc } from "src/renderer/core/ipc"
import { request } from "src/renderer/core/service"
import { useAppSelector } from "src/renderer/store/hooks"


export default function Detail() {

    const value = useAppSelector(state => state.main.value)

    useEffect(() => {
        console.log(value)
    }, [value])

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