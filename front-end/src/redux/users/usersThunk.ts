import { createAsyncThunk } from "@reduxjs/toolkit";
import { REACT_APP_ROOT_API } from "redux/api";
import { RegisterSellerValue } from "redux/auth/type";
import axios from "axios";
import { IGetAllUserRequest } from "./type";

export const getAllUsers = createAsyncThunk(
  "users/get-all",
  async (request: IGetAllUserRequest) => {
    try {
      const response = await axios.get(
        `${REACT_APP_ROOT_API}/user/${request.emailAdmin}/${request.idAdmin}`
      );
      return response;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const removeUser = createAsyncThunk(
  "users/remove-one",
  async (request: any) => {
    try {
      const response = await axios.get(
        `${REACT_APP_ROOT_API}/user/delete/${request.emailAdmin}/${request.idAdmin}/${request.idUser}`
      );
      return response;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const createUser = createAsyncThunk(
  "users/create-one",
  async (request: any) => {
    try {
      const response = await axios.post(
        `${REACT_APP_ROOT_API}/user/add`,
        request
      );
      return response;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);

export const editUser = createAsyncThunk("users/edit", async (request: any) => {
  try {
    const response = await axios.post(
      `${REACT_APP_ROOT_API}/user/edit`,
      request
    );
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
});

export const updateProfile = createAsyncThunk(
  "users/edit",
  async (request: any) => {
    try {
      const response = await axios.post(
        `${REACT_APP_ROOT_API}/user/update/profile`,
        request
      );
      return response;
    } catch (error: any) {
      throw error.response.data;
    }
  }
);
