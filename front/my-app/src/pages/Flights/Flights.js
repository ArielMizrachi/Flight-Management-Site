import React, { useEffect } from 'react'
import { Link } from "react-router-dom";

// mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// redux
import { useSelector, useDispatch } from 'react-redux'
import {GetFlightsAsync,  AllFlights, } from '../../redux/Flights/FlightSlice'
import {SelectSuper } from '../../redux/Login/LoginSlice'

// comp
import FlightTable from '../../components/FlightTable';

// router import
import {useLocation} from "react-router-dom";





const Flights = () => {

  const all_flights =useSelector(AllFlights)
  const is_super =useSelector(SelectSuper)
  const dispatch = useDispatch()
  const location = useLocation()

   // get all of the flights
  useEffect(() => {
    dispatch(GetFlightsAsync());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
            <Typography variant="h2" component="div" gutterBottom color={'#0047b3'}>our pretty nice flights</Typography>
      <Grid container spacing={2} >
    {is_super&&
      <Grid item xs={12} container >
         <Button variant="contained" style={{color: 'white', background:'#88B04B', marginTop: 12 }}>
        <Link to="/AddFlights" style={{color: 'white', textDecoration: 'none'}}>add a flight</Link>
        </Button>
      </Grid>
    }
      <Grid item xs={12} container  justifyContent="center" alignItems="center">
         {/* show add and update messages */}
         {location.state &&
          <Typography variant="h5" component="div" gutterBottom color={'green'}>{location.state.msg}</Typography>}
      </Grid>

      {/* showing all the flights */}
        <Grid item xs={10}>
        <FlightTable all_flights={all_flights}/>
        </Grid>

       </Grid> 
      

      

        

    </div>
  )
}

export default Flights