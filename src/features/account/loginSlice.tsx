import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api"
import { RootState } from "../../app/store"


interface LoginState {
    status: string,
    error: string | undefined,
    token: string
}

interface Credentials {
    email: string | undefined,
    password: string | undefined
}

const initialState: LoginState = {
    status: 'idle',
    error: undefined,
    token: ''
}

export const handleUserLogin = createAsyncThunk('login/handleUserLogin', async ({ email, password }: Credentials) => {
    const response = await api.post('customers/token/', { email, password })
    const { token } = response.data
    return token
})

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        handleUserLogout: (state) => {
            window.localStorage.removeItem('authToken')
            state.token = ''
        }
    },
    extraReducers(builder) {
        builder
            .addCase(handleUserLogin.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(handleUserLogin.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.token = action.payload
            })
            .addCase(handleUserLogin.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { handleUserLogout } = loginSlice.actions

export const selectLoginStatus = (state: RootState) => state.login.status

export const selectLoginError = (state: RootState) => state.login.error

export const selectToken = (state: RootState) => state.login.token

export default loginSlice.reducer