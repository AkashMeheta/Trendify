
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";

const initialState = {
    searchResult: [],
    isLoading: false,
};

export const getSearchResult = createAsyncThunk(
    "/friends/search",
    async (keyword) => {
        const response = await axios.get(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/friends/search/${keyword}`
        )
        return response.data;
    }
)

const SearchFriendSlice = createSlice({
    name:"searchFriend",
    initialState,
    reducers:{
        resetSearchResults: (state) => {
            state.searchResult = [];
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getSearchResult.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getSearchResult.fulfilled, (state, action) => {
            console.log("Search API Response:", action.payload.data);
            state.isLoading = false;
            state.searchResult = Array.isArray(action.payload?.data) ? action.payload.data : [];
        })
        .addCase(getSearchResult.rejected, (state) => {
            state.isLoading = false;
            state.searchResult = [];
        })
    }
})


export const { resetSearchResults } = SearchFriendSlice.actions;

export default SearchFriendSlice.reducer;