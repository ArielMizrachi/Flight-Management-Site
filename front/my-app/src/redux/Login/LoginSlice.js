import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DoLogin } from "./LoginAPI"
import jwt_decode from "jwt-decode";
import ErrorHandler from '../ErrorHandler'


const initialState = {
  id :null,
  token: null,
  username: null,
  is_staff: null,
  is_superuser: null,
  error_checker:null,
};

export const LoginAsync = createAsyncThunk(
  "Login/DoLogin",
  async (loginData) => {
    const response = await DoLogin(loginData);
    return response.data;
  }
);

export const LoginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    // log out
    LogOut: (state,action)=>{
    localStorage.setItem("token", null);
    state.token = null
    state.username = null
    state.is_staff = null
    state.is_superuser = null
  },

  // check the local storage and update the token on refresh
  CheckLogged: (state,action)=>{
    let myToken = localStorage.getItem("token");  
    if (myToken !== 'null') {
      state.token = myToken;
      state.id = jwt_decode(myToken).id;
      state.username = jwt_decode(myToken).username;
      state.is_staff = jwt_decode(myToken).is_staff;
      state.is_superuser = jwt_decode(myToken).is_superuser;
          }
  },

  // reseting the error
  LNRErrorCalibration: (state,action)=>{
    state.error_checker = null
},
  
},
  extraReducers: (builder) => {
    builder
    
    //setting the token and saving it
    .addCase(LoginAsync.fulfilled, (state, action) => {
      if(typeof action.payload !== 'number'){
          state.token = action.payload.access;
          state.id = jwt_decode(state.token).id;
          state.username = jwt_decode(state.token).username;
          state.is_staff = jwt_decode(state.token).is_staff;
          state.is_superuser = jwt_decode(state.token).is_superuser

          // set in local storage
          localStorage.setItem("token", state.token); 
          state.error_checker= 'good'
      }
      else {
        console.log(action.payload)
        state.error_checker=ErrorHandler(action.payload)
        console.log(state.error_checker)

      }   
    });
  },
});


export const SelectId = (state) => state.login.id;
export const SelectToken = (state) => state.login.token;
export const SelectUser = (state) => state.login.username;
export const SelectStaff = (state) => state.login.is_staff;
export const SelectSuper = (state) => state.login.is_superuser;
export const ErrorLoginNRegister = (state) => state.login.error_checker;
export const {LogOut, CheckLogged, LNRErrorCalibration} = LoginSlice.actions
export default LoginSlice.reducer;
