import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    listitems: [],
    isLoading: false
}
   
export const addListItems = createAsyncThunk(
    "/wishlist/add",
    async ({userId, productId, quantity}) => {
        const response = await axios.post(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/wishlist/add`,
            {
                userId, 
                productId, 
                quantity
            }
        );
        return response.data;
    }
)
export const getListItems = createAsyncThunk(
    "/wishlist/get",
    async ({userId}) => {
        const response = await axios.get(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/wishlist/get/${userId}`
        );
        return response.data;
    }
)

export const deleteListItems = createAsyncThunk(
    "/wishlist/delete",
    async ({userId, productId}) => {
        const response = await axios.delete(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/wishlist/${userId}/${productId}`
        )
        return response.data
    }
)


const WishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {

    },
    extraReducers: (buidler) => {
        buidler.addCase(addListItems.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addListItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listitems = action.payload.data.items;
        })
        .addCase(addListItems.rejected, (state) => {
            state.isLoading = false;
            state.listitems = [];
        })
        .addCase(getListItems.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getListItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listitems = action.payload.data.items;
        })
        .addCase(getListItems.rejected, (state) => {
            state.isLoading = false;
            state.listitems = [];
        })
        .addCase(deleteListItems.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteListItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listitems = action.payload.data.items;
        })
        .addCase(deleteListItems.rejected, (state) => {
            state.isLoading = false;
            state.listitems = [];
        })
    }
})

export default WishlistSlice.reducer