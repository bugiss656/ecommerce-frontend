import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api"
import { RootState } from "../../app/store"


export type Category = {
    name: string,
    parent_category: string | null,
    subcategories: Category[] | null
}

interface CategoriesState {
    status: string,
    error: string | undefined,
    categories: Category[] | null
}

const initialState: CategoriesState = {
    status: 'idle',
    error: undefined,
    categories: null
}

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await api.get('products/categories')
    return response.data
})

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.categories = action.payload
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectCategoriesStatus = (state: RootState) => state.categories.status

export const selectCategoriesError = (state: RootState) => state.categories.error

export const selectCategories = (state: RootState) => state.categories.categories

export default categoriesSlice.reducer