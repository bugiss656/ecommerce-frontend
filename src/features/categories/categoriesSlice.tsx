import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api"
import { RootState } from "../../app/store"


export type Category = {
    name: string,
    slug: string,
    parent_category: string | null,
    subcategories: Category[] | null
}

interface CategoriesState {
    categoriesStatus: string,
    categoriesError: string | undefined,
    subcategoriesStatus: string,
    subcategoriesError: string | undefined,
    categories: Category[] | null,
    subcategories: Category[] | null
}

const initialState: CategoriesState = {
    categoriesStatus: 'idle',
    categoriesError: undefined,
    subcategoriesStatus: 'idle',
    subcategoriesError: undefined,
    categories: null,
    subcategories: null
}

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await api.get('products/categories/')
    return response.data
})

export const fetchSubcategories = createAsyncThunk('categories/fetchSubcategories', async ({ category }: any) => {
    const response = await api.get(`products/subcategories/${category}`)
    return response.data
})

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.categoriesStatus = 'loading'
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categoriesStatus = 'succeeded'
                state.categories = action.payload
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.categoriesStatus = 'failed'
                state.categoriesError = action.error.message
            })
            .addCase(fetchSubcategories.pending, (state, action) => {
                state.subcategoriesStatus = 'loading'
            })
            .addCase(fetchSubcategories.fulfilled, (state, action) => {
                state.subcategoriesStatus = 'succeeded'
                state.subcategories = action.payload
            })
            .addCase(fetchSubcategories.rejected, (state, action) => {
                state.subcategoriesStatus = 'failed'
                state.subcategoriesError = action.error.message
            })
    }
})

export const selectCategoriesStatus = (state: RootState) => state.categories.categoriesStatus

export const selectCategoriesError = (state: RootState) => state.categories.categoriesError

export const selectCategories = (state: RootState) => state.categories.categories

export const selectSubcategoriesStatus = (state: RootState) => state.categories.subcategoriesStatus

export const selectSubcategoriesError = (state: RootState) => state.categories.subcategoriesError

export const selectSubcategories = (state: RootState) => state.categories.subcategories

export default categoriesSlice.reducer