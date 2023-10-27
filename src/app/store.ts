import { configureStore } from "@reduxjs/toolkit"
import loginReducer from "../features/account/loginSlice"
import accountReducer from "../features/account/accountSlice"


const store = configureStore({
    reducer: {
        login: loginReducer,
        account: accountReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch