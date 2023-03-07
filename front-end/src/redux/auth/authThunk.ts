import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { REACT_APP_ROOT_API } from "redux/api";
import { AuthRequest } from "./type";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (request: AuthRequest) => {
        const response = await axios.post(
            `${REACT_APP_ROOT_API}/auth/register`,
            request
        );
        return response.data;
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (request: AuthRequest) => {
        const response = await axios.post(
            `${REACT_APP_ROOT_API}/auth/login`,
            request
        );
        console.log('data response', response);
        return response;
    }
);

export const verifyEmail = createAsyncThunk(
    "auth/verify-email",
    async (token: String) => {
        const response = await axios.get(
            `${REACT_APP_ROOT_API}/auth/verify/${token}`
        );
        console.log('data response', response);
        return response;
    }
);