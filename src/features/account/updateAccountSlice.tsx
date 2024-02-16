import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api"
import { RootState } from "../../app/store"
import { Status } from "../types"


interface UpdateAccountState {
    status: Status,
    error: string | undefined,
}

const initialState: UpdateAccountState = {
    status: Status.IDLE,
    error: undefined,
}

export const updateUserData: any = createAsyncThunk(
    'account/updateAccountData',
    async ({ userId, data }: any) => {
        await api.patch(`customers/update/${userId}`,
        data, 
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )}
)

export const updateAccountSlice = createSlice({
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

export const selectUpdateAccountStatus = (state: RootState) => state.updateAccount.status

export const selectUpdateAccountError = (state: RootState) => state.updateAccount.error

export default updateAccountSlice.reducer 