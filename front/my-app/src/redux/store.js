import { configureStore } from "@reduxjs/toolkit";
import FlightReducer from './Flights/FlightSlice'
import LoginReducer from './Login/LoginSlice'
import CountriesReducer from './Countries/CountriesSlice'
import AirlinesReducer from './Airlines/AirlineSlice'
import UserReducer from './Users/UsersSlice'
import TicketReducer from './Tickets/TicketSlice'
import CustomerReducer from './Customer/CustomersSlice'

// import { combineReducers  } from 'redux'
export const store = configureStore({
  reducer: {
    flight   : FlightReducer,
    login    : LoginReducer,
    country  : CountriesReducer,
    airline  : AirlinesReducer,
    user     : UserReducer,
    ticket   : TicketReducer,
    customer : CustomerReducer
  },
});
