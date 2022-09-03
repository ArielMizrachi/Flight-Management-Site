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
import MyFlights from './pages/Flights/MyFlights';
import FlightUserAdd from './pages/Flights/FlightUserAdd';

import Countries from "./pages/Countries/Countries";
import AddCountries from './pages/Countries/AddCountry';
import UpdateCountries from './pages/Countries/UpdateCountry';

import Airlines from './pages/Airlines/Airlines'
import AddAirlines from './pages/Airlines/AddAirlines'
import UpdateAirlines from './pages/Airlines/UpdateAirlines'

import Login from "./pages/LoginNRegister/Login";
import Register from './pages/LoginNRegister/Register'
import Users from './pages/Users/Users'
import UpdateUser from './pages/Users/UpdateUser'

import Tickets from './pages/Tickets/Tickets'
import MyTickets from './pages/Tickets/MyTickets'

import Customers from './pages/Customers/Customers'
import AddCustomer from './pages/Customers/AddCustomer'
import UpdateCustomer from './pages/Customers/UpdateCustomer'

// redux
import {store} from './redux/store'
import {Provider} from 'react-redux'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
    <Provider store={store}>
      <Routes>

        <Route path="/" element={<App />} >
        <Route index element={<Home />} />

        {/* flights url */}
          <Route path="Flights" element={<Flights />} />
          <Route path="AddFlights" element={<AddFlights />} />
          <Route path="UpdateFlight" element={<UpdateFlight />} />
          <Route path="MyFlights" element={<MyFlights />} />
          <Route path="FlightUserAdd" element={<FlightUserAdd />} />

          {/* countries url */}
          <Route path="Countries" element={<Countries />} />
          <Route path="AddCountry" element={<AddCountries />} />
          <Route path="UpdateCountry" element={<UpdateCountries />} />

          {/* airlines url */}
          <Route path="Airlines" element={<Airlines />} />
          <Route path="AddAirline" element={<AddAirlines />} />
          <Route path="UpdateAirline" element={<UpdateAirlines />} />

          {/* customers url */}
          <Route path="Customers" element={<Customers />} />
          <Route path="AddCustomer" element={<AddCustomer />} />
          <Route path="UpdateCustomer" element={<UpdateCustomer />} />

          {/* ticket url */}
          <Route path="Tickets" element={<Tickets />} />
          <Route path="MyTickets" element={<MyTickets />} />

        {/* login and register url */}
          <Route path="Login" element={<Login />} />
          <Route path="Login/:note" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="Users" element={<Users />} />
          <Route path="UpdateUser" element={<UpdateUser />} />
        </Route>
        <Route path="*" element={<Error404 />} />
        
      </Routes>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);


