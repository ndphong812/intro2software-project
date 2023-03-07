import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { REACT_APP_ROOT_API } from "redux/api";
import { SwalAlert } from "utils/sweet-alter";
import { AuthRequest } from "./type";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (request: AuthRequest) => {
        try {
            const response = await axios.post(
                `${REACT_APP_ROOT_API}/auth/register`,
                request
            );
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (request: AuthRequest) => {
        try {
            const response = await axios.post(
                `${REACT_APP_ROOT_API}/auth/login`,
                request
            );
            return response;
        }
        catch (error: any) {
            throw error.response.data;
        }
    }
);

export const verifyEmail = createAsyncThunk(
    "auth/verify-email",
    async (token: String) => {
        const response = await axios.get(
            `${REACT_APP_ROOT_API}/auth/verify-email/${token}`
        );
        return response;
    }
);

export const verifyLoginToken = createAsyncThunk(
    "auth/verify-login-email",
    async (token: String) => {
        const response = await axios.post(
            `${REACT_APP_ROOT_API}/auth/verify-login-token`, {
            token: token
        }
        );
        return response;
    }
);