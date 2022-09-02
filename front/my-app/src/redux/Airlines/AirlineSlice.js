import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorHandler from '../ErrorHandler'
import { GetAirlines, AddAirline, DeleteAirline, GetOneAirline, UpdateAirline, GetAirlineNames} from "./AirlineAPI";





// start value
const initialState = {
  airlines: [],
  my_one_airline: 'null',
  error_checker:null,
  airlines_names: [],
};

// async functions

// get all airlines
export const GetAirlineAsync = createAsyncThunk(
  "airline/GetAirlines",
  async () => {
    const response = await GetAirlines();
    return response.data;
  }
);

// get one airline
export const GetOneAirlineAsync = createAsyncThunk(
  "airline/GetOneAirline",
  async (airline_id) => {
    const response = await GetOneAirline(airline_id);
    return response.data;
  }
);

// get all of the airlines names
export const GetAirlinesNamesAsync = createAsyncThunk(
  "country/GetAirlineNames",
  async () => {
    const response = await GetAirlineNames();
    return response.data;
  }
);

// add a airline
export const AddAirlineAsync = createAsyncThunk(
  "flight/AddAirline",
  async (new_airline) => { 
    const response = await AddAirline(new_airline);
    return response.data;
  }
);

// delete airline
export const DeleteAirlineAsync = createAsyncThunk(
  "flight/DeleteAirline",
  async (id) => {
    await DeleteAirline(id);
    return id;
  }
);

// update airline
export const UpdateAirlineAsync = createAsyncThunk(
  "airline/UpdateAirline",  
  async (data) => { 
    const response = await UpdateAirline (data.airliene_data, data.id);
    return response.data;
  }
);



// slice
export const AirlineSlice = createSlice({
  name: "airline",
  initialState,
  reducers: {
          AirlineErrorCalibration: (state,action)=>{
            state.error_checker = null
        },
        
  },

  // extra 
  extraReducers: (builder) => {
    builder

      // gets all flights
      .addCase(GetAirlineAsync.fulfilled, (state, action) => {
        state.airlines = action.payload
      })

      // gets one flight
      .addCase(GetOneAirlineAsync.fulfilled, (state, action) => {
        state.airlines_names = action.payload
    
      })

      // gets all airlines name
      .addCase(GetAirlinesNamesAsync.fulfilled, (state, action) => {
        state.airlines_names = action.payload
      })

      // adds a flight
      .addCase(AddAirlineAsync.fulfilled, (state, action) => {
        if(typeof action.payload !== 'number'){
          state.airlines.push(action.payload);
          state.error_checker='good'
        }
        else {
          state.error_checker=ErrorHandler(action.payload)
          console.log(state.error_checker)

        }
  
      })

      // update a flight
      .addCase(UpdateAirlineAsync.fulfilled, (state, action) => {
        if(typeof action.payload !== 'number'){
          state.error_checker='good'
        }
        else {
          state.error_checker=ErrorHandler(action.payload)
          console.log(state.error_checker)

        }
  
      })

      // delete from list
      .addCase(DeleteAirlineAsync.fulfilled, (state, action) => {
        state.airlines = state.airlines.filter(airlines=> airlines.id !==  action.payload);
    })
      
    
    }, 

     

});

export const AirlinesNames = (state) => state.airline.airlines_names;
export const AllAirlines = (state) => state.airline.airlines;
export const SelectOneAirline = (state) => state.airline.my_one_airline;
export const ErrorAirline = (state) => state.airline.error_checker;
export const {AirlineErrorCalibration} = AirlineSlice.actions
export default AirlineSlice.reducer;
