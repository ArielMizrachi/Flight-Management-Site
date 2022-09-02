import React, { useEffect } from 'react'
import { Link } from "react-router-dom";

// mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// redux
import { useSelector, useDispatch } from 'react-redux'
import {GetAirlineAsync, AllAirlines} from '../../redux/Airlines/AirlineSlice'

// comp
import AirlineTable from '../../components/AirlineTable';

// router import
import {useLocation} from "react-router-dom";





const Airlines = () => {

  const all_airlines =useSelector(AllAirlines)
  const dispatch = useDispatch()
  const location = useLocation()

   // get all of the airlines
  useEffect(() => {
    dispatch(GetAirlineAsync());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Grid container spacing={2} >

      <Grid item xs={12} container >
         <Button variant="contained" style={{color: 'white', background:'#88B04B', marginTop: 12 }}>
        <Link to="/AddAirline" style={{color: 'white', textDecoration: 'none'}}>add an airline</Link>
        </Button>
      </Grid>

      <Grid item xs={12} container  justifyContent="center" alignItems="center">
         {/* show add and update messages */}
         {location.state &&
          <Typography variant="h5" component="div" gutterBottom color={'green'}>{location.state.msg}</Typography>}
      </Grid>

      {/* showing all the airlines */}
        <Grid item xs={10}>
        <AirlineTable all_airlines={all_airlines}/>
        </Grid>

       </Grid> 
      

      

        

    </div>
  )
}

export default Airlines