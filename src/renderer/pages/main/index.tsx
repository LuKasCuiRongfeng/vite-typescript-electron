import React from 'react'

import { useAppDispatch, useAppSelector } from 'renderer/store/hooks'
import './index.css'

function Main() {
    const dispatch = useAppDispatch()
    const value = useAppSelector(state => state.main.value)

    return (
        <div>
            <div>{value}</div>
            <button onClick={() => {
                dispatch({
                    type: "main/increment",
                    payload: 23
                })
            }}>add value</button>
        </div>
    )
}


export default Main