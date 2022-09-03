import React, { useState, useEffect } from 'react'

// mui import
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

// redux import
import {AddAirlineAsync, ErrorAirline, AirlineErrorCalibration, IsNowAnAirline} from '../../redux/Airlines/AirlineSlice'
import {CountriesNames, GetCountriesNamesAsync} from '../../redux/Countries/CountriesSlice'
import {useDispatch, useSelector} from "react-redux";
import {LogOut} from '../../redux/Login/LoginSlice'

// router import
import { useNavigate, Link } from "react-router-dom";


const AddAirlines = () => {

    const [name, SetCompanyName] = useState('')
    const [country, SetCountry] = useState('')

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const error_chk =useSelector(ErrorAirline)
    const countries_names =useSelector(CountriesNames)


    // remove error if page refreshed
    useEffect(() => {
        dispatch(AirlineErrorCalibration())
        dispatch(GetCountriesNamesAsync())
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


    //   check if the airline was implemnted correctly
    useEffect(() => {
        if (error_chk === 'good'){
            dispatch(AirlineErrorCalibration())
            dispatch(IsNowAnAirline())
            navigate("/" ,{state:{msg: `Airline ${name} was added to the database` }})
        } 
        // in case of 401 
        if (error_chk === 'Please login again'){
            dispatch(AirlineErrorCalibration())
            dispatch(LogOut())
            navigate("/Login/401")
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps     
      }, [error_chk]);
    

    return (
        <div>
            <Paper sx={{ p: 2, margin: '30px', maxWidth: 500, flexGrow: 1 }}>

                <Grid container spacing={3} direction="column" alignItems="flex-start">
                    <Grid item xs={12}>
                        <Typography variant="h5" component="div" gutterBottom>Please inset the following details</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography  component="div" gutterBottom color={'red'}>{error_chk}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="comany name"
                            onChange={(evt) => SetCompanyName(evt.target.value)} />
                    </Grid>
                    <Grid item xs={12}>

                   {/*if there are any countries it will put them in a combo box if not it will send the to add countries*/}
                   { countries_names.length > 0 ?    
                                <Autocomplete
                                disablePortal
                                id="combo-box-countries"
                                options={countries_names}
                                sx={{ width: 225 }}
                                onChange={(event, newValue) => {
                                    SetCountry(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} label="countries" />}
                                />
                                :
                                <Typography  component="div" gutterBottom color={'red'}>
                                    there are no counries avilable please go and add some <Link style={{color: 'blue'}} to="/Countries">here</Link>
                                    </Typography>
                            }             
                    </Grid>
                
                    <Grid item xs={12} container>
                        <Grid item xs={10}></Grid>
                        <Grid item xs={2} >
                            <Button variant="contained"
                                    disabled={countries_names.length === 0}
                                    onClick={() =>{dispatch(AddAirlineAsync({
                                    "name": name,
                                    "country": country,
                                    }));}}>

                                submit</Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Paper>
        </div>
    )
}

export default AddAirlines




