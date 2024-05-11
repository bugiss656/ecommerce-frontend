import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api"
import { RootState } from "../../app/store"
import { Attribute } from './types'
import { Status } from "../types"


interface AttributesState {
    status: Status,
    error: string | undefined,
    attributes: Attribute[] | undefined
}

const initialState: AttributesState = {
    status: Status.IDLE,
    error: undefined,
    attributes: undefined
}

export const fetchAttributes = createAsyncThunk<Attribute[], { category: string | undefined }>(
    'products/fetchAttributes',
    async ({ category }) => {
        const response = await api.get(`products/attributes/${category}`)
        return response.data
    }
)

export const attributesSlice = createSlice({
    name: 'attributes',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchAttributes.pending, (state) => {
            state.status = Status.LOADING
        })
        .addCase(fetchAttributes.fulfilled, (state, action) => {
            state.status = Status.SUCCEEDED
            state.attributes = action.payload
        })
        .addCase(fetchAttributes.rejected, (state, action) => {
            state.status = Status.FAILED
            state.error = action.error.message
        })
    }
})

export const selectAttributesStatus = (state: RootState) => state.attributes.status

export const selectAttributesError = (state: RootState) => state.attributes.error

export const selectAttributes = (state: RootState) => state.attributes.attributes

export default attributesSlice.reducer