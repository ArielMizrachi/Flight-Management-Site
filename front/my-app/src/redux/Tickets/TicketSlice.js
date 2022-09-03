import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorHandler from '../ErrorHandler'
import { GetTickets, AddTicket, DeleteTicket, GetMyTickets} from "./TicketAPI";





// start value
const initialState = {
  tickets: [],
  error_checker:null,
};

// async functions

// get all tickets
export const GetTicketsAsync = createAsyncThunk(
  "airline/GetTickets",
  async () => {
    const response = await GetTickets();
    return response.data;
  }
);

// get my tickets
export const MyTicketsAsync = createAsyncThunk(
  "airline/GetMyTickets",
  async () => {
    const response = await GetMyTickets();
    return response.data;
  }
);

// add a ticket
export const AddTicketAsync = createAsyncThunk(
  "flight/AddTicket",
  async (new_ticket) => { 
    const response = await AddTicket(new_ticket);
    return response.data;
  }
);

// delete ticket
export const DeleteTicketAsync = createAsyncThunk(
  "flight/DeleteTicket",
  async (id) => {
    await DeleteTicket(id);
    return id;
  }
);

// slice
export const TicketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    TicketErrorCalibration: (state,action)=>{
      state.error_checker = null
  },
  
},
  error_checker:null,

  // extra 
  extraReducers: (builder) => {
    builder

      // gets all tickets
      .addCase(GetTicketsAsync.fulfilled, (state, action) => {
        state.tickets = action.payload
      })

      // gets my tickets
      .addCase(MyTicketsAsync.fulfilled, (state, action) => {
        state.tickets = action.payload
      })

      // adds a ticket
      .addCase(AddTicketAsync.fulfilled, (state, action) => {
        if(typeof action.payload !== 'number'){
          state.tickets.push(action.payload);
          state.error_checker='good'
        }
        else {
          state.error_checker=ErrorHandler(action.payload)
          console.log(state.error_checker)

        }
  
      })

      // delete from list
      .addCase(DeleteTicketAsync.fulfilled, (state, action) => {
        state.tickets = state.tickets.filter(ticket=> ticket.id !==  action.payload);
    })
      
    
    }, 

     

});

export const AllTickets = (state) => state.ticket.tickets;
export const ErrorUser = (state) => state.ticket.error_checker;
export const {TicketErrorCalibration} = TicketSlice.actions
export default TicketSlice.reducer;
