import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hook";
import Register from "./pages/register";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "pages/login";
import HomePage from "pages/home-page";
import "./scss/global.scss";
import VerifyEmail from "pages/verify-email";
import { verifyLoginToken } from "redux/auth/authThunk";
import BeatLoader from "react-spinners/BeatLoader";
import { loadingOveride } from "utils/loading";
import ForgotPassword from "pages/forgot-password";
import AdminDashBoard from "pages/admin";
import { authState } from "redux/auth/authSlice";
import Profile from "pages/profile";
import SearchPage from "pages/search";
import DetailProductPage from "pages/detail-product-page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApplicationPage from "pages/application-page";
import MyShop from "pages/my-shop";
import Cart from "pages/cart-list";
import ChangePassword from "pages/change-password";
import Checkout from "pages/checkout";
import ManageProduct from "pages/manage-product";
import OrderSeller from "components/orders-seller";
import HistorySeller from "pages/history-seller";

function PrivateRoute({ children, authRequired }: any) {
  const [isChecking, setIsChecking] = useState<Boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const access_token = localStorage.getItem("access_token");
  const dispatch = useAppDispatch();
  const verifyAccess = async () => {
    const response = await dispatch(verifyLoginToken(access_token as String));
    if (
      response &&
      response.payload &&
      (response.payload as any).data.status === "success"
    ) {
      setIsChecking(false);
      setIsLoggedIn(true);
    } else {
      setIsChecking(false);
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    verifyAccess();
  }, [access_token]);

  if (isChecking)
    return (
      <BeatLoader
        color={"#4096FF"}
        loading={Boolean(isChecking)}
        cssOverride={loadingOveride}
        size={20}
        margin={2}
        speedMultiplier={1}
      />
    );

  return !isChecking && isLoggedIn ? (
    authRequired ? (
      children
    ) : (
      <Navigate to="/" />
    )
  ) : authRequired ? (
    <Navigate to="/auth/login" />
  ) : (
    children
  );
}

const App = () => {
  const access_token = localStorage.getItem("access_token");
  const dispatch = useAppDispatch();
  const verifyAccess = async () => {
    await dispatch(verifyLoginToken(access_token as String));
  };

  useEffect(() => {
    verifyAccess();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashBoard />} />
        <Route
          path="/auth/register"
          element={
            <PrivateRoute>
              <Register />
            </PrivateRoute>
          }
        />
        <Route
          path="/auth/login"
          element={
            <PrivateRoute>
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path="/auth/forgot-password"
          element={
            <PrivateRoute>
              <ForgotPassword />
            </PrivateRoute>
          }
        />
        <Route
          path="/verify/:token"
          element={
            <PrivateRoute>
              <VerifyEmail />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/*"
          element={
            <PrivateRoute authRequired>
              <Profile />
            </PrivateRoute>
          }
        >
          <Route path="account" element={<ApplicationPage />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route
          path="/my-shop"
          element={
            <PrivateRoute authRequired>
              <MyShop />
            </PrivateRoute>
          }
        >
          <Route path="products" element={<ManageProduct />} />
          <Route path="history" element={<HistorySeller />} />
          <Route path="orders" element={<OrderSeller />} />
        </Route>

        <Route path="/search" element={<SearchPage />} />

        <Route path="/detail/:productId" element={<DetailProductPage />} />
        <Route
          path="/checkout"
          element={
            <PrivateRoute authRequired>
              <Checkout />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
