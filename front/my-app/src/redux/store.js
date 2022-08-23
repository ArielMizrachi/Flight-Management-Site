import { configureStore } from "@reduxjs/toolkit";
import FlightReducer from './Flights/FlightSlice'
import LoginReducer from './LoginNRegister/LoginSlice'
export const store = configureStore({
  reducer: {
    flight : FlightReducer,
    login  : LoginReducer,
  },
});
