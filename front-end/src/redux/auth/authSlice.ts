import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { User, UserResponse } from './type';
import { loginUser, registerUser, verifyEmail } from './authThunk';
import { SwalAlert } from 'utils/sweet-alter';
    
const initialState: UserResponse = {
    isLoading: false,
    status: '',
    access_token: '',
    user: {
        id: "",
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
                const response = action.payload.data;
                localStorage.setItem('access_token', response.access_token);
                state.access_token = response.access_token;
                state.status = response.status;
                state.user = response.user;
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
                SwalAlert('Fail', 'Server is error now.', 'error');
            })
    }
})

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions
export const authState = (state: RootState) => state.auth;
export const authReducer = authSlice.reducer;