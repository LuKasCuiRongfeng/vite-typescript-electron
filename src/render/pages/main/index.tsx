import React from 'react'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { ipc } from '../../ipc/utils'
import './index.css'

function Main() {
    const dispatch = useAppDispatch()
    const app = useAppSelector(state => state.app)
    const add = () => {
        dispatch({
            type: "app/increment",
            payload: 23
        })
    }
    const openWin = () => {
        ipc({
            type: "CREATE_WIN",
            data: {
                key: "about",
                data: {
                    type: "about/increment",
                    payload: "hello world"
                }
            }
        })
    }

    const changeAbout = () => {
        ipc({
            type: "SEND_MSG",
            data: {
                key: "about",
                data: {
                    type: "about/increment",
                    payload: "main"
                }
            }
        })
    }
    return (
        <div>
            <h1 className="h1">{app.value}</h1>
            <button onClick={add}>dd</button>
            <button onClick={openWin}>open new win</button>
            <button onClick={changeAbout}>change about</button>
        </div>
    )
}


export default Main