import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorHandler from "../ErrorHandler";
import { GetFlights, AddFlight, DeleteFlight, GetOneFlight, UpdateFlight} from "./FlightAPI";



// start value
const initialState = {
  status: "idle",
  flights: [],
  my_one_flight: '',
  error_checker:null,
};

// async functions

// get all flights
export const GetFlightsAsync = createAsyncThunk(
  "flight/GetFlights",
  async () => {
    const response = await GetFlights();
    return response.data;
  }
);

// get one flights
export const GetOneFlightAsync = createAsyncThunk(
  "flight/GetOneFlight",
  async (flight_id) => {
    const response = await GetOneFlight(flight_id);
    return response.data;
  }
);

// add a flight
export const AddFlightAsync = createAsyncThunk(
  "flight/AddFlight",
  async (new_flight) => { 
    const response = await AddFlight(new_flight);
    return response.data;
  }
);

// delete flights
export const DeleteFlightAsync = createAsyncThunk(
  "flight/DeleteFlight",
  async (id) => {
    await DeleteFlight(id);
    return id;
  }
);

// update flights
export const UpdateFlightAsync = createAsyncThunk(
  "flight/UpdateFlight",
  async (NewFlight) => {
    let NewBody = {
      "airline_company": NewFlight.airline_company,
      "origin_country": NewFlight.origin_country,
      "destenation_country": NewFlight.destenation_country,
      "remaining_ticets": NewFlight.remaining_ticets,
      "departure_time": NewFlight.departure_time,
      "landing_time": NewFlight.landing_time,
    };
    let id = NewFlight.id;
    const response = await UpdateFlight(NewBody, id);
    return response.data;
  }
);



// slice
export const FlightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
          ErrorCalibration: (state,action)=>{
            state.error_checker = null
        }
  },

  // extra 
  extraReducers: (builder) => {
    builder

    // changes to load status
      .addCase(GetFlightsAsync.pending, (state) => {
        state.status = "loading";
      })

      // gets all flights
      .addCase(GetFlightsAsync.fulfilled, (state, action) => {
        state.flights = action.payload
        state.status = "done";
      })

      // gets one flight
      .addCase(GetOneFlightAsync.fulfilled, (state, action) => {
        state.my_one_flight = action.payload
    
      })

      // adds a flight
      .addCase(AddFlightAsync.fulfilled, (state, action) => {
        if(typeof action.payload !== 'number'){
          state.flights.push(action.payload);
          state.error_checker='good'
        }
        else {
          state.error_checker=ErrorHandler(action.payload)
          console.log(state.error_checker)

        }
  
      })

      // delete from list
      .addCase(DeleteFlightAsync.fulfilled, (state, action) => {
        state.flights = state.flights.filter(flight=> flight.id !==  action.payload);
    })
      
    
    }, 

     

});

export const AllFlights = (state) => state.flight.flights;
export const SelectFlights = (state) => state.flight.status;
export const SelectOneFlight = (state) => state.flight.my_one_flight;
export const ErrorFlight = (state) => state.flight.error_checker;
export const {ErrorCalibration} = FlightSlice.actions
export default FlightSlice.reducer;
