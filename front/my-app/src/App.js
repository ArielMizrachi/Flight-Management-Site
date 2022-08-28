import MyNav from "./components/MyNav";
import React, { useEffect } from 'react'
import { Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux'
import {CheckLogged} from './redux/LoginNRegister/LoginSlice'


function App() {

  const dispatch = useDispatch()

  // make sure the if the user is looged or not
  useEffect(() => {
    dispatch(CheckLogged());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <MyNav/>
      <Outlet />
      </header>
    </div>
  );
}

export default App;
