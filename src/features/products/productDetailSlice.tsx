import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api"
import { RootState } from "../../app/store"
import { Product } from "./productsSlice"


interface ProductState {
    status: string,
    error: string | undefined,
    product: Product | undefined
}

const initialState: ProductState = {
    status: 'idle',
    error: undefined,
    product: undefined
}

export const fetchProductDetail = createAsyncThunk<Product, { slug: string | undefined }>('products/fetchProductDetail', async ({ slug }) => {
    const response = await api.get(`products/product/${slug}`)
    return response.data
})

export const productDetailSlice = createSlice({
    name: 'singleProduct',
    initialState,
    reducers: {
        clearProductState: (state) => {
            state.status = 'idle'
            state.error = undefined
            state.product = undefined
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProductDetail.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchProductDetail.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.product = action.payload
            })
            .addCase(fetchProductDetail.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { clearProductState } = productDetailSlice.actions

export const selectSingleProductStatus = (state: RootState) => state.product.status

export const selectSingleProductError = (state: RootState) => state.product.error

export const selectSingleProduct = (state: RootState) => state.product.product

export default productDetailSlice.reducer