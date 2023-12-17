import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api"
import { RootState } from "../../app/store"


export type Product = {
    name: string,
    category: string,
    supplier: string,
    stock_quantity: number,
    price: number,
    main_image: string,
    description: string,
}

interface ProductsState {
    status: string,
    error: string | undefined,
    products: Product[] | null
}

const initialState: ProductsState = {
    status: 'idle',
    error: undefined,
    products: null
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ category }: any) => {
    const response = await api.get(`products/${category}`)
    return response.data
})

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectProductsStatus = (state: RootState) => state.products.status

export const selectProductsError = (state: RootState) => state.products.error

export const selectProducts = (state: RootState) => state.products.products

export default productsSlice.reducer