
import React, { useEffect } from 'react'
import { Link } from "react-router-dom";

// mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

// redux
import { useSelector, useDispatch } from 'react-redux'
import {GetFlightsAsync,  AllFlights} from '../../redux/Flights/FlightSlice'

// comp
import FlightTable from '../../components/FlightTable';




const Flights = () => {

  // const my_one_flight=useSelector(SelectOneFlight)
  const all_flights =useSelector(AllFlights)
  // const my_flight_status =useSelector(SelectFlights)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(GetFlightsAsync());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Button variant="contained"><Link to="/AddFlights" style={{color: 'white'}}>add a flight</Link></Button>
      <br/><br/>

     
  

      <Grid container spacing={2}>
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