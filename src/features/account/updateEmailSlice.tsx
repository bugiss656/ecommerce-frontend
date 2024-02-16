import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { Status } from "../types"
import { updateUserData } from "./updateAccountSlice"


interface UpdateEmailState {
    status: Status,
    error: string | undefined,
}

const initialState: UpdateEmailState = {
    status: Status.IDLE,
    error: undefined,
}

export const updateEmailSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(updateUserData.pending, (state) => {
                state.status = Status.LOADING
            })
            .addCase(updateUserData.fulfilled, (state) => {
                state.status = Status.SUCCEEDED
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.status = Status.FAILED
                state.error = action.error.message
            })
    }
})

export const selectUpdateEmailStatus = (state: RootState) => state.updateEmail.status

export const selectUpdateEmailError = (state: RootState) => state.updateEmail.error

export default updateEmailSlice.reducer 