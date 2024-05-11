import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api"
import { RootState } from "../../app/store"
import { Supplier } from "./types"


interface SuppliersState {
    status: string,
    error: string | undefined,
    suppliers: Supplier[] | undefined
}

const initialState: SuppliersState = {
    status: 'idle',
    error: undefined,
    suppliers: undefined
}

export const fetchSuppliers = createAsyncThunk<Supplier[], { category: string | undefined }>(
    'products/fetchSuppliers',
    async ({ category }) => {
        const response = await api.get(`products/suppliers/${category}`)
        return response.data
    }
)

export const suppliersSlice = createSlice({
    name: 'suppliers',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchSuppliers.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchSuppliers.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.suppliers = action.payload
            })
            .addCase(fetchSuppliers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectSuppliersStatus = (state: RootState) => state.suppliers.status

export const selectSuppliersError = (state: RootState) => state.suppliers.error

export const selectSuppliers = (state: RootState) => state.suppliers.suppliers

export default suppliersSlice.reducer