import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { REACT_APP_ROOT_API } from "redux/api";

export const getAllProduct = createAsyncThunk(
    "product/get-all",
    async () => {
        try {
            const response = await axios.get(
                `${REACT_APP_ROOT_API}/product`,
            );
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);

export const getDetailProduct = createAsyncThunk(
    "product/get-detail",
    async (productId: string) => {
        try {
            const response = await axios.get(
                `${REACT_APP_ROOT_API}/product/${productId}`,
            );
            return response.data;
        } catch (error: any) {
            throw error.response.data;
        }
    }
);