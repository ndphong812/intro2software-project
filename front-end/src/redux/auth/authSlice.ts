import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { User, UserResponse } from './type';
import { forgotPassword, loginUser, logoutUser, registerUser, verifyEmail, verifyLoginToken } from './authThunk';

const initialState: UserResponse = {
    isLoading: false,
    status: '',
    access_token: '',
    isLoggin: false,
    user: {
        user_id: "",
        email: "",
        address: "",
        phone: "",
        avatar_link: "",
        fullname: "",
        role: "",
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                const response = action.payload?.data;
                localStorage.setItem('access_token', response.access_token);
                state.isLoading = false;
                state.access_token = response.access_token;
                state.status = response.status;
                state.user = response.user;
            })
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
            })
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(registerUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
            })
        builder
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(verifyEmail.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.isLoading = false;
            })
        builder
            .addCase(verifyLoginToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoggin = true;
                state.access_token = action.payload.data.access_token;
                state.user = { ...action.payload.data.user };
            })
            .addCase(verifyLoginToken.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(verifyLoginToken.rejected, (state, action) => {
                state.isLoading = false;
            })

        builder
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(forgotPassword.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false;
            });
        builder
            .addCase(logoutUser.fulfilled, (state, action) => {
                state = { ...initialState };
                localStorage.removeItem("access_token");
            })
            .addCase(logoutUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
            })
    }
})

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions
export const authState = (state: RootState) => state.auth;
export const authReducer = authSlice.reducer;