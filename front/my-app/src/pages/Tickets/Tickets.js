import React, { useEffect } from 'react'


// mui
import Grid from '@mui/material/Grid';


// redux
import { useSelector, useDispatch } from 'react-redux'
import {GetTicketsAsync, AllTickets} from '../../redux/Tickets/TicketSlice'

// comp
import TicketsTable from '../../components/TicketsTable';


const Tickets = () => {

  const all_tickets =useSelector(AllTickets)
  const dispatch = useDispatch()
 

   // get all of the tickets
  useEffect(() => {
    dispatch(GetTicketsAsync());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Grid container spacing={2} >
      {/* showing all the airlines */}
        <Grid item xs={10}>
        <TicketsTable all_tickets={all_tickets}/>
        </Grid>

       </Grid> 
      

      

        

    </div>
  )
}

export default Tickets