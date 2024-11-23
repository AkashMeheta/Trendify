import axios from "axios"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    listitems: [],
    isLoading: false,
    privacy: false
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

export const updatePrivacy = createAsyncThunk(
    "/wishlist/update/privacy",
    async ({userId, privacy}) => {
        const response = await axios.put(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/wishlist/update/privacy`,
            {
                userId,
                privacy
            }
        );
        return response.body;
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
            state.privacy = action.payload.data.privacy;
            
        })
        .addCase(getListItems.rejected, (state) => {
            state.isLoading = false;
            state.listitems = [];
            state.privacy = false;
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
        .addCase(updatePrivacy.pending, (state)=> {
            state.isLoading = true;
        })
        .addCase(updatePrivacy.fulfilled, (state, action) => {
            state.isLoading = false;
            state.privacy = action.payload.data.privacy;
        })
        .addCase(updatePrivacy.rejected, (state) => {
            state.isLoading = false;
            state.privacy = false;
        })
    }
})

export default WishlistSlice.reducer