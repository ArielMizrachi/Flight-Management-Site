import React, { useEffect } from 'react'
import { Link } from "react-router-dom";

// mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// redux
import { useSelector, useDispatch } from 'react-redux'
import {GetFlightsAsync,  AllFlights, } from '../../redux/Flights/FlightSlice'

// comp
import FlightTable from '../../components/FlightTable';

// router import
import {useLocation} from "react-router-dom";
// navigate("/Flights" ,{state:{chk :'chk'}})




const Flights = () => {

  const all_flights =useSelector(AllFlights)
  const dispatch = useDispatch()
  const location = useLocation()

   // get all of the flights
  useEffect(() => {
    dispatch(GetFlightsAsync());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Button variant="contained"><Link to="/AddFlights" style={{color: 'white'}}>add a flight</Link></Button>
      <br/><br/>

      <Grid container spacing={2} >
      <Grid item xs={12} container  justifyContent="center" alignItems="center">
         {/* show add and update messages */}
         {location.state &&
          <Typography variant="h5" component="div" gutterBottom color={'green'}>{location.state.msg}</Typography>}
      </Grid>

      <Grid item xs={1}></Grid>
      {/* showing all the flights */}
        <Grid item xs={10}>
        <FlightTable all_flights={all_flights}/>
        </Grid>

       </Grid> 
      

      

        

    </div>
  )
}

export default Flights