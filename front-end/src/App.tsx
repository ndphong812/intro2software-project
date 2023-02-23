import axios from 'axios';
import React, { useEffect } from 'react';

function App() {

  const [data, setData] = React.useState();
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
    <div className="App">
      <h1>Welcome to No Name Group</h1>
      <h2>Response:{data}</h2>
    </div>
  );
}

export default App;