import { configureStore } from "@reduxjs/toolkit";
import FlightReducer from './Flights/FlightSlice'
import LoginReducer from './LoginNRegister/LoginSlice'
import CountriesReducer from './Countries/CountriesSlice'
// import { combineReducers  } from 'redux'
export const store = configureStore({
  reducer: {
    flight : FlightReducer,
    login  : LoginReducer,
    country  : CountriesReducer,
  },
});
