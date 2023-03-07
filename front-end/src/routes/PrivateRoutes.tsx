import { useAppDispatch, useAppSelector } from "app/hook";
import { Navigate, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { verifyLoginToken } from "redux/auth/authThunk";
import { authState } from "redux/auth/authSlice";
import Login from "pages/login";

const PrivateRoute = ({ children }: any) => {

  const access_token = localStorage.getItem('access_token');
  const selector = useAppSelector(authState);
  const dispatch = useAppDispatch();
  const [allowAccess, setAllowAccess] = useState<Boolean>(false);
  const verifyAccess = async () => {
    const response = await dispatch(verifyLoginToken(access_token as String));
    setAllowAccess(selector.allowAccess);
    if (!selector.allowAccess) {
      return (
        <Login />
      )
    }
  }

  useEffect(() => {
    verifyAccess();
  }, [])
  return (
    <>
      {children}
    </>
  );
}

export default PrivateRoute;