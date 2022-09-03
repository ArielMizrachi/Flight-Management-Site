import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorHandler from '../ErrorHandler'
import { GetCustomers, AddCustomer, DeleteCustomer, GetOneCustomer, UpdateCustomer} from "./CustomersAPI";





// start value
const initialState = {
  customers: [],
  is_customer: null,
  my_one_customer: 'null',
  error_checker:null,
};

// async functions

// get all customers
export const GetCustomersAsync = createAsyncThunk(
  "customer/GetCustomers",
  async () => {
    const response = await GetCustomers();
    return response.data;
  }
);

// get one customer
export const GetOneCustomerAsync = createAsyncThunk(
  "customer/GetOneCustomer",
  async (customer_id) => {
    const response = await GetOneCustomer(customer_id);
    return response.data;
  }
);

// check if is customer
export const CheckCustomerAsync = createAsyncThunk(
  "customer/CheckOneCustomer",
  async (customer_id) => {
    const response = await GetOneCustomer(customer_id);
    return response.data;
  }
);

// add a customer
export const AddCustomerAsync = createAsyncThunk(
  "flight/AddCustomer",
  async (new_customer) => { 
    const response = await AddCustomer(new_customer);
    return response.data;
  }
);

// delete customer
export const DeleteCustomerAsync = createAsyncThunk(
  "flight/DeleteCustomer",
  async (id) => {
    await DeleteCustomer(id);
    return id;
  }
);

// update customer
export const UpdateCustomerAsync = createAsyncThunk(
  "airline/UpdateCustomer",  
  async (data) => { 
    const response = await UpdateCustomer (data.customer_data, data.id);
    return response.data;
  }
);



// slice
export const CustomerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
          CustomerErrorCalibration: (state,action)=>{
            state.error_checker = null
        },
        
  },

  // extra 
  extraReducers: (builder) => {
    builder

      // gets all customers
      .addCase(GetCustomersAsync.fulfilled, (state, action) => {
        state.customers = action.payload
      })


      // gets one customer
      .addCase(GetOneCustomerAsync.fulfilled, (state, action) => {
        state.my_one_customer = action.payload

      })

      // adds a customer
      .addCase(AddCustomerAsync.fulfilled, (state, action) => {
        if(typeof action.payload !== 'number'){
          state.customers.push(action.payload);
          state.error_checker='good'
        }
        else {
          state.error_checker=ErrorHandler(action.payload)
          console.log(state.error_checker)

        }
  
      })

      // update a customer
      .addCase(UpdateCustomerAsync.fulfilled, (state, action) => {
        if(typeof action.payload !== 'number'){
          state.error_checker='good'
        }
        else {
          state.error_checker=ErrorHandler(action.payload)
          console.log(state.error_checker)

        }
  
      })

      // delete from list
      .addCase(DeleteCustomerAsync.fulfilled, (state, action) => {
        state.customers = state.customers.filter(customer=> customer.id !==  action.payload);
    })

     // delete from list
     .addCase(CheckCustomerAsync.fulfilled, (state, action) => {
      if(typeof action.payload !== 'number'){
        console.log(action.payload)
        state.is_customer ='good'
      }
      else{
        console.log(action.payload)
      }
    })
    }, 

     

});

export const AllCustomers = (state) => state.customer.customers;
export const SelectOneCustomer = (state) => state.customer.my_one_customer;
export const ErrorCustomer = (state) => state.customer.error_checker;
export const {CustomerErrorCalibration} = CustomerSlice.actions
export default CustomerSlice.reducer;
