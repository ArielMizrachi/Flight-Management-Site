import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ErrorHandler from '../ErrorHandler'
import { GetTickets, AddTicket, DeleteTicket} from "./TicketAPI";





// start value
const initialState = {
  tickets: [],
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
  reducers: { },

  // extra 
  extraReducers: (builder) => {
    builder

      // gets all tickets
      .addCase(GetTicketsAsync.fulfilled, (state, action) => {
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
export default TicketSlice.reducer;
