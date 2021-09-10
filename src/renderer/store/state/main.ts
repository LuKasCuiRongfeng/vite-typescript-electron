import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface State {
    value: number
}

const initialState: State = {
    value: 12
}

export const main  = createSlice({
    name: "main",
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        }
    }
})

export default main.reducer