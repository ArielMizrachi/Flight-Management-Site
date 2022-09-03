import React, { useEffect } from 'react'


// mui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';



// redux
import { useSelector, useDispatch } from 'react-redux'
import {MyTicketsAsync, AllTickets} from '../../redux/Tickets/TicketSlice'

// comp
import TicketsTable from '../../components/TicketsTable';


const MyTickets = () => {

  const all_tickets =useSelector(AllTickets)
  const dispatch = useDispatch()
 

   // get all of the tickets
  useEffect(() => {
    dispatch(MyTicketsAsync());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>

      {all_tickets.length > 0 ?
      <Grid container spacing={2} >
      {/* showing all the tickets */}
        <Grid item xs={10}>
        <TicketsTable all_tickets={all_tickets}/>
        </Grid>
       </Grid> 
      :
      <Typography variant="h5" component="div" gutterBottom>sorry you have no flights mate</Typography>
      }

      

        

    </div>
  )
}

export default MyTickets