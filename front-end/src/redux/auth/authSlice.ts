import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { User, UserResponse } from './type';
import { loginUser } from './authThunk';

const initialState: UserResponse = {
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
    }
})

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions
export const authState = (state: RootState) => state.auth;
export const authReducer = authSlice.reducer;