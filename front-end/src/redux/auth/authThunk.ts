import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { REACT_APP_ROOT_API } from "redux/api";
import { LoginRequest } from "./type";

export const loginUser = createAsyncThunk(
    "auth/login",
    async (request: LoginRequest) => {
        const response = await axios.post(
            `${REACT_APP_ROOT_API}/auth/login`,
            request
        );
        console.log('data response', response);
        return response;
    }
);