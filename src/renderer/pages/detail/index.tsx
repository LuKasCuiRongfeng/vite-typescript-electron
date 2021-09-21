import React, { useEffect } from "react"
import AwesomeTitlebar from "src/renderer/components/awsome-titlebar"
import { menuTemplate } from "src/renderer/components/awsome-titlebar/menuTemplate"
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
            <AwesomeTitlebar template={menuTemplate} />
            <h1>detail</h1>
            <button onClick={get}>detail 请求一次看看</button>
            <button>{window.theme}</button>
        </div>
    )
}