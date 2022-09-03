import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorHandler from '../ErrorHandler'
import { GetUsers, AddUser, DeleteUser, GetOneUser, UpdateUser} from "./UsersAPI";





// start value
const initialState = {
  users: [],
  my_one_user: 'null',
  error_checker:null,
};

// async functions

// get all users
export const GetUsersAsync = createAsyncThunk(
  "airline/GetUsers",
  async () => {
    const response = await GetUsers();
    return response.data;
  }
);

// get one user
export const GetOneUserAsync = createAsyncThunk(
  "airline/GetOneUser",
  async (airline_id) => {
    const response = await GetOneUser(airline_id);
    return response.data;
  }
);

// add a user
export const AddUserAsync = createAsyncThunk(
  "flight/AddUser",
  async (new_user) => { 
    const response = await AddUser(new_user);
    return response.data;
  }
);

// delete user
export const DeleteUserAsync = createAsyncThunk(
  "flight/DeleteUser",
  async (id) => {
    await DeleteUser(id);
    return id;
  }
);

// update user
export const UpdateUserAsync = createAsyncThunk(
  "airline/UpdateUser",  
  async (data) => { 
    const response = await UpdateUser (data.user_data, data.id);
    return response.data;
  }
);



// slice
export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
          UserErrorCalibration: (state,action)=>{
            state.error_checker = null
        },
        
  },

  // extra 
  extraReducers: (builder) => {
    builder

      // gets all users
      .addCase(GetUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload
      })


      // gets one user
      .addCase(GetOneUserAsync.fulfilled, (state, action) => {
        state.my_one_user = action.payload

      })

      // adds a user
      .addCase(AddUserAsync.fulfilled, (state, action) => {
        if(typeof action.payload !== 'number'){
          state.users.push(action.payload);
          state.error_checker='good'
        }
        else {
          state.error_checker=ErrorHandler(action.payload)
          console.log(state.error_checker)

        }
  
      })

      // update a user
      .addCase(UpdateUserAsync.fulfilled, (state, action) => {
        if(typeof action.payload !== 'number'){
          state.error_checker='good'
        }
        else {
          state.error_checker=ErrorHandler(action.payload)
          console.log(state.error_checker)

        }
  
      })

      // delete from list
      .addCase(DeleteUserAsync.fulfilled, (state, action) => {
        state.users = state.users.filter(users=> users.id !==  action.payload);
    })
      
    
    }, 

     

});

export const AllUsers = (state) => state.user.users;
export const SelectOneUser = (state) => state.user.my_one_user;
export const ErrorUser = (state) => state.user.error_checker;
export const {UserErrorCalibration} = UserSlice.actions
export default UserSlice.reducer;
