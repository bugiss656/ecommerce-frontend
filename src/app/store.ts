import { configureStore } from "@reduxjs/toolkit"
import loginReducer from "../features/account/loginSlice"
import accountReducer from "../features/account/accountSlice"
import bannerReducer from "../features/banner/bannerSlice"


const store = configureStore({
    reducer: {
        login: loginReducer,
        account: accountReducer,
        banner: bannerReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch