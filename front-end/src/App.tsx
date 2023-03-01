import axios from 'axios';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hook';
import Footer from './components/footer';
import { counterState, decrement, increment } from './redux/counterSlice';
import "./scss/global.scss";
const App = () => {
  const [data, setData] = React.useState();

  const selector = useAppSelector(counterState);
  const dispatch = useAppDispatch();
  const getApi = async () => {
    console.log("Running..")
    try {
      const response = await axios.get(`http://localhost:5000/api/helloworld`);
      console.log("response", response);
      setData(response.data.message);
    } catch (error) {
      console.log("error", error)
    }
  }
  useEffect(() => {
    getApi();
  }, [])
  return (
    <div>
      <h2>Response from Server:{data}</h2>
      <button onClick={() => dispatch(increment())}>Increase</button>
      <h3>Value:{selector.value}</h3>
      <button onClick={() => dispatch(decrement())}>Decrease</button>
      <Footer />
    </div>
  );
}

export default App;