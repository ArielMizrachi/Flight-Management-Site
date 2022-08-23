import MyNav from "./components/MyNav";
import React from 'react'
import { Outlet } from "react-router-dom";


function App() {
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
