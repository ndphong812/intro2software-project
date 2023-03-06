import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hook';
import Register from './pages/register';
import { Routes, Route } from 'react-router-dom';
import Login from 'pages/login';
import HomePage from 'pages/home-page';
import "./scss/global.scss";

const App = () => {
  const [data, setData] = React.useState();

  const dispatch = useAppDispatch();
  const getApi = async () => {
    try {

    } catch (error) {
      console.log("error", error)
    }
  }
  useEffect(() => {
    getApi();
  }, [])
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/auth/register' element={<Register />} />
      <Route path='/auth/login' element={<Login />} />
    </Routes>
  );
}

export default App;