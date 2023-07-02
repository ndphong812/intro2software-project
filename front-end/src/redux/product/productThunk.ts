import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { REACT_APP_ROOT_API } from "redux/api";
import { Cart, CartRequest, UpdateCartRequest } from "./type";

export const searchProduct = createAsyncThunk(
  "product/search",
  async (name: string) => {
    try {
      const response = await axios.post(
        `${REACT_APP_ROOT_API}/product/search`,
        {
          name: name,
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const getAllProduct = createAsyncThunk(
  "product/get-all",
  async (page: number) => {
    try {
      const response = await axios.get(
        `${REACT_APP_ROOT_API}/product?page=${page}`
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
        `${REACT_APP_ROOT_API}/product/${productId}`
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "product/add-to-cart",
  async (newCart: Cart) => {
    try {
      const response = await axios.post(`${REACT_APP_ROOT_API}/cart/add`, {
        newCart: newCart,
      });
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const getCarts = createAsyncThunk(
  "product/get-carts",
  async (user_id: string) => {
    try {
      const response = await axios.post(`${REACT_APP_ROOT_API}/cart`, {
        user_id,
      });
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const removeFromCarts = createAsyncThunk(
  "product/remove-from-carts",
  async (cartRequest: CartRequest) => {
    try {
      const response = await axios.post(`${REACT_APP_ROOT_API}/cart/delete`, {
        user_id: cartRequest.user_id,
        product_id: cartRequest.product_id,
      });
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const updateAmountCarts = createAsyncThunk(
  "product/update-amount-carts",
  async (cartRequest: UpdateCartRequest) => {
    try {
      const response = await axios.post(`${REACT_APP_ROOT_API}/cart/update`, {
        user_id: cartRequest.user_id,
        product_id: cartRequest.product_id,
        amount: cartRequest.amount,
      });
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const getWaitingProducts = createAsyncThunk(
  "product/get-waitings",
  async (request: any) => {
    try {
      const response = await axios.get(
        `${REACT_APP_ROOT_API}/product/listNeedAccept/${request.emailAdmin}/${request.idAdmin}`
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const acceptProduct = createAsyncThunk(
  "product/accepts",
  async (request: any) => {
    try {
      const response = await axios.post(
        `${REACT_APP_ROOT_API}/product/acceptListProduct`,
        request
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const adminRemoveProduct = createAsyncThunk(
  "product/admin-remove",
  async (request: any) => {
    try {
      const response = await axios.post(
        `${REACT_APP_ROOT_API}/product/acceptListProduct`,
        request
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const historyUser = createAsyncThunk(
  "product/history-user",
  async (request: any) => {
    try {
      const response = await axios.post(
        `${REACT_APP_ROOT_API}/order/history`,
        request
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);
