import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api"
import { RootState } from "../../app/store"
import { Status } from "../types"


interface CheckPasswordState {
    status: Status,
    error: string | undefined
}

const initialState: CheckPasswordState = {
    status: Status.IDLE,
    error: undefined
}

export const checkUserPassword = createAsyncThunk(
    'account/checkUserPassword',
    async ({ userId, data }: any) => {
        await api.post(`customers/check-password/${userId}`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }
)

export const checkPasswordSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(checkUserPassword.pending, (state) => {
                state.status = Status.LOADING
            })
            .addCase(checkUserPassword.fulfilled, (state) => {
                state.status = Status.SUCCEEDED
            })
            .addCase(checkUserPassword.rejected, (state, action) => {
                state.status = Status.FAILED
                state.error = action.error.message
            })
    }
})

export const selectCheckPasswordStatus = (state: RootState) => state.checkPassword.status

export const selectCheckPasswordError = (state: RootState) => state.checkPassword.error

export default checkPasswordSlice.reducer