import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    userId:'',
    userRole: '',
    userName:'',
    userDescription: '',
    userImg: ''
};

export const getUserDetails = createAsyncThunk(
    "/user/getUserDetails",
    async(id) => {
        const response = await axios.get(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/user/userDetails/${id}`
        );
        return response.data;
    }
);

export const updateUserDetails = createAsyncThunk(
    "/user/update",
    async({userName, userDescription, userId, userImg})=> {
        console.log("from dispath" ,userName, userDescription, userId)
        const response = await axios.put(
            `${import.meta.env.VITE_SERVER_BASE_URL}/api/user/update/${userId}`,
            {
                userName, 
                userDescription,
                userImg
            }
        );
        return response.data;
    }
)

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUserDetails.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUserDetails.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.userName = action.payload.userDetails.userName,
            state.userDescription = action.payload.userDetails.description;
            state.userRole = action.payload.userDetails.role;
            state.userId = action.payload.userDetails._id;
            state.userImg = action.payload.userDetails.image;
        })
        .addCase(getUserDetails.rejected, (state)=>{
            state.isLoading = false;
            state.userName = null,
            state.userDescription = null;
            state.userRole = null;
            state.userId = null;
            state.userImg = null;
        })
        .addCase(updateUserDetails.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUserDetails.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.userName = action.payload.userName,
            state.userDescription = action.payload.description;
            state.userRole = action.payload.role;
            state.userId = action.payload._id;
            state.userImg = action.payload.image;
        })
        .addCase(updateUserDetails.rejected, (state)=>{
            state.isLoading = false;
            state.userName = null,
            state.userDescription = null;
            state.userRole = null;
            state.userId = null;
            state.userImg = null;
        })
    }
})


export default userSlice.reducer;