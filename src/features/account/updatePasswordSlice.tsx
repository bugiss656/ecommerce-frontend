import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { Status } from "../types"
import { updateUserData } from "./updateAccountSlice"


interface UpdatePasswordState {
    status: Status,
    error: string | undefined,
}

const initialState: UpdatePasswordState = {
    status: Status.IDLE,
    error: undefined,
}

export const updatePasswordSlice = createSlice({
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

export const selectUpdatePasswordStatus = (state: RootState) => state.updatePassword.status

export const selectUpdatePasswordError = (state: RootState) => state.updatePassword.error

export default updatePasswordSlice.reducer 