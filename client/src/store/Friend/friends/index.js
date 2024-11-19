
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";

const initialState = {
    friendsList: [],
    isLoading: false,
    friendDetails: {
        userDetails: {}, // User details structure
        friendInfo: []   // Friend relationship structure
    },
    friendWishlist: []
};

export const addFriend = createAsyncThunk(
    "/friend/add",
    async ({userId, friendId}) => {
        const response = await axios.post(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/friends/add`,
            {
                userId: userId,
                friendId: friendId
            }
        )
        return response.data;
    }
)

export const getFriendList = createAsyncThunk(
    "/friends/get",
    async (userId) => {
        const response = await axios.get(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/friends/${userId}`,
        )
        return response.data;
    }
)

export const getFriendDetails = createAsyncThunk(
    "/friends/get/frienddetails",
    async (friendId) => {
        const response = await axios.get(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/user/userDetails/${friendId}`
        )
        const response2 = await axios.get(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/friends/${friendId}`,
        )
        const AllFriendDetails = {
            details: response.data,
            friend: response2.data
        }
        return AllFriendDetails;
    }
)

export const getFriendWishlist = createAsyncThunk(
    "/friends/get/friendwishlist",
    async (friendId) => {
        const response = await axios.get(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/wishlist/get/${friendId}`
        )
        return response.data;
    }
)

export const deleteFriend = createAsyncThunk(
    "/friends/delete",
    async ({userId, friendId}) => {
        const response = await axios.delete(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/friends/${userId}/${friendId}`,
        )
        return response.data;
    }
)
const FriendSlice = createSlice({
    name:"friends",
    initialState,
    reducers:{
       
    },
    extraReducers: (builder) => {
        builder
        .addCase(addFriend.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addFriend.fulfilled, (state, action) => {
            state.isLoading = false;
            state.friendsList = action.payload.friendsList?.friends;
        })
        .addCase(addFriend.rejected, (state) => {
            state.isLoading = false;
            state.friendsList = [];
        })
        .addCase(getFriendList.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getFriendList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.friendsList = action.payload.data?.friends || [];
        })
        .addCase(getFriendList.rejected, (state) => {
            state.isLoading = false;
            state.friendsList = [];
        })
        .addCase(deleteFriend.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteFriend.fulfilled, (state, action) => {
            
            state.isLoading = false;
            state.friendsList =action.payload.friendList?.friends || [];
        })
        .addCase(deleteFriend.rejected, (state) => {
            state.isLoading = false;
            state.friendsList = [];
        })
        .addCase(getFriendDetails.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getFriendDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.friendDetails = {
                userDetails: action.payload.details.userDetails || {}, 
                friendInfo: action.payload.friend.data || [] 
            };
        })
        .addCase(getFriendDetails.rejected, (state) => {
            state.isLoading = false;
            state.friendDetails = {
                userDetails: {},
                friendInfo: []
            };
        })
        .addCase(getFriendWishlist.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getFriendWishlist.fulfilled, (state, action) => {
            state.isLoading = false;
            state.friendWishlist = action.payload.data.items || [];
        })
        .addCase(getFriendWishlist.rejected, (state) => {
            state.isLoading = false;
            state.friendWishlist = [];
        })
    }
})



export default FriendSlice.reducer;