import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api"
import { RootState } from "../../app/store"
import { Status } from "../types"
import { Account } from "./types"


interface AccountState {
    status: Status,
    error: string | undefined,
    account: Account | undefined
}

const initialState: AccountState = {
    status: Status.IDLE,
    error: undefined,
    account: undefined
}

export const fetchAccountData = createAsyncThunk('account/fetchAccountData', async () => {
    const response = await api.get('customers/user')
    return response.data
})

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAccountData.pending, (state) => {
                state.status = Status.LOADING
            })
            .addCase(fetchAccountData.fulfilled, (state, action) => {
                state.status = Status.SUCCEEDED
                state.account = action.payload
            })
            .addCase(fetchAccountData.rejected, (state, action) => {
                state.status = Status.FAILED
                state.error = action.error.message
            })
    }
})


export const selectAccountStatus = (state: RootState) => state.account.status

export const selectAccountError = (state: RootState) => state.account.error

export const selectAccount = (state: RootState) => state.account.account

export default accountSlice.reducer