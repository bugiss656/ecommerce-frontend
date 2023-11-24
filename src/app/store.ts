import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { PreloadedState } from "@reduxjs/toolkit"

import loginReducer from "../features/account/loginSlice"
import accountReducer from "../features/account/accountSlice"
import bannerReducer from "../features/banner/bannerSlice"


const rootReducer = combineReducers({
    login: loginReducer,
    account: accountReducer,
    banner: bannerReducer 
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']