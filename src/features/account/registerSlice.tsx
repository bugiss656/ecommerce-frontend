import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api"
import { RootState } from "../../app/store"
import { Status } from "../types"
import { RegistrationFields } from "../../components/RegisterForm/RegisterForm"


interface RegisterState {
    status: Status,
    error: string | undefined,
}

const initialState: RegisterState = {
    status: Status.IDLE,
    error: undefined
}

export const handleUserRegistration = createAsyncThunk(
    'register/handleUserRegistration',
    async ({ email, password, firstName, lastName }: RegistrationFields) => {
        await api.post('customers/register/', {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
)

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(handleUserRegistration.pending, (state) => {
                state.status = Status.LOADING
            })
            .addCase(handleUserRegistration.fulfilled, (state) => {
                state.status = Status.SUCCEEDED
            })
            .addCase(handleUserRegistration.rejected, (state, action) => {
                state.status = Status.FAILED
                state.error = action.error.message
            })
    }
})

export const selectRegistrationStatus = (state: RootState) => state.register.status

export const selectRegistrationError = (state: RootState) => state.register.error

export default registerSlice.reducer