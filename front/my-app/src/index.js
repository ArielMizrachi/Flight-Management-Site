import React from 'react';
import './css/index.css';
import App from './App';
import ReactDOM from 'react-dom/client';

// react router
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, } from "react-router-dom";

// pages
import Error404 from "./pages/Error404";
import Home from './pages/Home';

import Flights from "./pages/Flights/Flights";
import AddFlights from './pages/Flights/AddFlights';
import UpdateFlight from './pages/Flights/UpdateFlight';

import Login from "./pages/LoginNRegister/Login";

// redux
import {store} from './redux/store'
import {Provider} from 'react-redux'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>

    <Provider store={store}>
        
{/* routes */}
      <Routes>

        <Route path="/" element={<App />} >
        <Route index element={<Home />} />
          <Route path="Flights" element={<Flights />} />
          <Route path="AddFlights" element={<AddFlights />} />
          <Route path="UpdateFlight" element={<UpdateFlight />} />
          <Route path="Login" element={<Login />} />
          <Route path="Login/:note" element={<Login />} />
        </Route>
        <Route path="*" element={<Error404 />} />
        
      </Routes>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);


