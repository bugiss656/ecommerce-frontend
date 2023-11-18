import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api"
import { RootState } from "../../app/store"


export type Banner = {
    title: string,
    isActive: boolean,
    orderingNumber: number,
    image: string,
    href: string
}

interface BannerState {
    status: string,
    error: string | undefined,
    banners: null | Banner[]
}

const initialState: BannerState = {
    status: 'idle',
    error: undefined,
    banners: null
}

export const fetchBanners = createAsyncThunk('banner/fetchBanners', async () => {
    const response = await api.get('banners/')
    return response.data
})

export const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchBanners.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchBanners.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.banners = action.payload
            })
            .addCase(fetchBanners.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})


export const selectBannerStatus = (state: RootState) => state.banner.status

export const selectBannerError = (state: RootState) => state.banner.error

export const selectBanners = (state: RootState) => state.banner.banners

export default bannerSlice.reducer