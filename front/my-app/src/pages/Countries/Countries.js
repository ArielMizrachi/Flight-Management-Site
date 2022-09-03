import React, { useEffect } from 'react'
import { Link } from "react-router-dom";

// mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// redux
import { useSelector, useDispatch } from 'react-redux'
import {GetCountriesAsync, AllCountries} from '../../redux/Countries/CountriesSlice'
import {SelectSuper } from '../../redux/Login/LoginSlice'

// comp
import CountriesTable from '../../components/CountriesCards';

// router import
import {useLocation} from "react-router-dom";





const Countries = () => {

  const all_countries =useSelector(AllCountries)
  const is_super =useSelector(SelectSuper)
  const dispatch = useDispatch()
  const location = useLocation()

   // get all of the flights
  useEffect(() => {
    dispatch(GetCountriesAsync());
    console.log('hello')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <div>
            <Typography variant="h2" component="div" gutterBottom color={'#0047b3'}>our one of a kind countries</Typography>
      <Grid container spacing={2} >
    {is_super&&
      <Grid item xs={12} container >
         <Button variant="contained" style={{color: 'white', background:'#88B04B', marginTop: 12 }}>
        <Link to="/AddCountry" style={{color: 'white', textDecoration: 'none'}}>add a country</Link>
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
        <CountriesTable all_countries={all_countries}/>
        </Grid>

       </Grid>

        

    </div>
  )
}

export default Countries