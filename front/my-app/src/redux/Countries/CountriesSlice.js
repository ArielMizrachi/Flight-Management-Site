import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorHandler from '../ErrorHandler'
import { GetCountries, AddCountry, DeleteCountry, GetOneCountry, UpdateCountry, GetCountriesName} from "./CountriesAPI";





// start value
const initialState = {
  countries: [],
  error_checker:null,
  my_one_country:'null',
  country_names:[]
};

// async functions

// get all country
export const GetCountriesAsync = createAsyncThunk(
  "flight/GetCountries",
  async () => {
    const response = await GetCountries();
    return response.data;
  }
);

// get one country
export const GetOneCountryAsync = createAsyncThunk(
  "country/GetOneCountry",
  async (country_id) => {
    const response = await GetOneCountry(country_id);
    return response.data;
  }
);

// get all of the countries names
export const GetCountriesNamesAsync = createAsyncThunk(
  "country/GetCountriesName",
  async () => {
    const response = await GetCountriesName();
    return response.data;
  }
);

// add a country
export const AddCountryAsync = createAsyncThunk(
  "country/AddCountry",
  async (new_country) => { 
    console.log(new_country)
    const response = await AddCountry(new_country);
    return response.data;
  }
);

// delete country
export const DeleteCountryAsync = createAsyncThunk(
  "country/DeleteCountry",
  async (id) => {
    await DeleteCountry(id);
    return id;
  }
);

// update country
export const UpdateCountryAsync = createAsyncThunk(
  "country/UpdateCountry",
  async (data) => { 
    const response = await UpdateCountry (data.form_data, data.id);
    return response.data;
  }
);



// slice
export const CountriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
          CountryErrorCalibration: (state,action)=>{
            state.error_checker = null
        },
        
  },

  // extra 
  extraReducers: (builder) => {
    builder

      // gets all Countries
      .addCase(GetCountriesAsync.fulfilled, (state, action) => {
        state.countries = action.payload
      })

      // gets one Country
      .addCase(GetOneCountryAsync.fulfilled, (state, action) => {
        state.my_one_country = action.payload
    
      })

      // gets all countries name
      .addCase(GetCountriesNamesAsync.fulfilled, (state, action) => {
        state.country_names = action.payload
    
      })

      // adds a Country
      .addCase(AddCountryAsync.fulfilled, (state, action) => {
        if(typeof action.payload !== 'number'){
          console.log(action.payload)
          state.countries.push(action.payload);
          state.error_checker='good'
        }
        else {
          console.log(action.payload)
          state.error_checker=ErrorHandler(action.payload)
          console.log(state.error_checker)

        }
  
      })

      // update a Country
      .addCase(UpdateCountryAsync.fulfilled, (state, action) => {
        if(typeof action.payload !== 'number'){
          state.error_checker='good'
        }
        else {
          state.error_checker=ErrorHandler(action.payload)
          console.log(state.error_checker)

        }
  
      })

      // delete from list
      .addCase(DeleteCountryAsync.fulfilled, (state, action) => {
        state.countries = state.countries.filter(country=> country.id !==  action.payload);
    })
      
    
    }, 
     

});

export const CountriesNames = (state) => state.country.country_names;
export const SelectOneCountry = (state) => state.country.my_one_country;
export const AllCountries = (state) => state.country.countries;
export const ErrorCountry = (state) => state.country.error_checker;
export const {CountryErrorCalibration} = CountriesSlice.actions
export default CountriesSlice.reducer;
