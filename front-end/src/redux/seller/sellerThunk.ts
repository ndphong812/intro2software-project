import { createAsyncThunk } from "@reduxjs/toolkit";
import { REACT_APP_ROOT_API } from "redux/api";
import { RegisterSellerValue } from "redux/auth/type";
import axios from "axios";

export const registerSeller = createAsyncThunk(
    "auth/register-seller",
    async (userInfor: RegisterSellerValue) => {
        try {
            const response = await axios.post(
                `${REACT_APP_ROOT_API}/seller/accept`, userInfor
            );
            return response;
        }
        catch (error: any) {
            throw error.response.data;
        }
    }
);