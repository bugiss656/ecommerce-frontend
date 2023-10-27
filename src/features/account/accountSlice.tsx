import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api"
import { RootState } from "../../app/store"


interface AccountState {
    status: string,
    error: string | undefined,
    account: {}
}

export const fetchAccountData = createAsyncThunk('account/fetchAccountData', async () => {
    const response = await api.get('customers/user')
    return response.data
})

const initialState: AccountState = {
    status: 'idle',
    error: undefined,
    account: {}
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAccountData.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAccountData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.account = action.payload
            })
            .addCase(fetchAccountData.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})


export const selectAccountStatus = (state: RootState) => state.account.status

export const selectAccountError = (state: RootState) => state.account.error

export const selectAccount = (state: RootState) => state.account.account

export default accountSlice.reducer