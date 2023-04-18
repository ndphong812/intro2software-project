import { createAsyncThunk } from "@reduxjs/toolkit";
import { REACT_APP_ROOT_API } from "redux/api";
import { RegisterSellerValue } from "redux/auth/type";
import axios from "axios";
import { AddProductSeller, GelAllOrderSeller, GetProductSeller, RemoveProductSeller } from "./type";

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

export const getProductSeller = createAsyncThunk(
    "product/get-product-seller",
    async (request: GetProductSeller) => {
        try {
            const response = await axios.post(
                `${REACT_APP_ROOT_API}/product/seller`, request
            );
            return response;
        }
        catch (error: any) {
            throw error.response.data;
        }
    }
);

export const removeProductSeller = createAsyncThunk(
    "product/remove-product-seller",
    async (request: RemoveProductSeller) => {
        try {
            const response = await axios.post(
                `${REACT_APP_ROOT_API}/product/delete`, request
            );
            return response;
        }
        catch (error: any) {
            throw error.response.data;
        }
    }
);

export const addProductSeller = createAsyncThunk(
    "product/add-product-seller",
    async (request: AddProductSeller) => {
        try {
            const response = await axios.post(
                `${REACT_APP_ROOT_API}/product/add`, request
            );
            return response;
        }
        catch (error: any) {
            throw error.response.data;
        }
    }
);


export const updateProductSeller = createAsyncThunk(
    "product/update-product-seller",
    async (request: AddProductSeller) => {
        try {
            const response = await axios.post(
                `${REACT_APP_ROOT_API}/product/update`, request
            );
            return response.data;
        }
        catch (error: any) {
            throw error.response.data;
        }
    }
);

export const gelAllOrderSeller = createAsyncThunk(
    "order/gel-all-order-seller",
    async (request: GelAllOrderSeller) => {
        try {
            const response = await axios.post(
                `${REACT_APP_ROOT_API}/order`, request
            );
            return response.data;
        }
        catch (error: any) {
            throw error.response.data;
        }
    }
);