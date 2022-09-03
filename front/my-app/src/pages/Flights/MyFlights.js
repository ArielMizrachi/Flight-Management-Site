import React, { useEffect } from 'react'
import { Link } from "react-router-dom";

// mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// redux
import { useSelector, useDispatch } from 'react-redux'
import {MyFlightsAsync,  AllFlights} from '../../redux/Flights/FlightSlice'

// comp
import MyFlightTable from '../../components/MyFlightTable ';

// router import
import {useLocation} from "react-router-dom";





const MyFlights = () => {

  const all_flights =useSelector(AllFlights)
  const dispatch = useDispatch()
  const location = useLocation()

   // get all of the flights
  useEffect(() => {
    dispatch(MyFlightsAsync());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Grid container spacing={2} >

      <Grid item xs={12} container >
         <Button variant="contained" style={{color: 'white', background:'#88B04B', marginTop: 12 }}>
        <Link to="/FlightUserAdd" style={{color: 'white', textDecoration: 'none'}}>add a flight</Link>
        </Button>
      </Grid>
  
      <Grid item xs={12} container  justifyContent="center" alignItems="center">
         {/* show add and update messages */}
         {location.state &&
          <Typography variant="h5" component="div" gutterBottom color={'green'}>{location.state.msg}</Typography>}
      </Grid>

      {/* showing all the flights */}
      {all_flights.length !== 0 ? 
        <Grid item xs={10}>
        <MyFlightTable all_flights={all_flights}/>
        </Grid>
      :
      <Grid item xs={12}>
      <Typography variant="h5" component="div" gutterBottom color={'green'}>add more flights</Typography>
      </Grid> 
      }
       </Grid> 
      
   

        

    </div>
  )
}

export default MyFlights