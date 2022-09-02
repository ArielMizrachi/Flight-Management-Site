import React, {useState, useEffect} from 'react'

// redux
import {useDispatch, useSelector} from "react-redux";
import {SelectOneAirline, UpdateAirlineAsync, ErrorAirline, AirlineErrorCalibration} from '../../redux/Airlines/AirlineSlice'
import {CountriesNames, GetCountriesNamesAsync} from '../../redux/Countries/CountriesSlice'
import {LogOut} from '../../redux/Login/LoginSlice'

// material ui
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

// route import
import {useNavigate} from "react-router-dom";

const UpdateAirlines = () => {

    let navigate = useNavigate()
    const dispatch = useDispatch();
    const airline = useSelector(SelectOneAirline)
    const error_chk =useSelector(ErrorAirline)
    const countries_names =useSelector(CountriesNames)
    
    const [name, SetCompanyName] = useState(airline.name)
    const [country, SetCountry] = useState(airline.country)


    // return to the airline page if refreshed or entered without a airline
  useEffect(() => {
    if (airline === 'null'){
        navigate("/Airlines")
    }
    // calibration of the error
    dispatch(AirlineErrorCalibration())
    dispatch(GetCountriesNamesAsync())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    //   check if the airline was implemnted correctly
    useEffect(() => {
        if (error_chk === 'good'){
            dispatch(AirlineErrorCalibration())
            navigate("/Airlines" ,{state:{msg: `airline number ${airline.id} was updated successfully` }})
        } 
        // in case of 401 
        if (error_chk === 'Please login again'){
            dispatch(AirlineErrorCalibration())
            dispatch(LogOut())
            navigate("/Login/401")
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps     
    }, [error_chk]);  

    const HandleSubmit = () => {
        let airliene_data = {
            "name": name,
            "country": country,}

        let id =airline.id    
        
        dispatch(UpdateAirlineAsync({airliene_data, id})) 
    }
    
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
        <TextField id="outlined-basic" variant="outlined" label="comany name" defaultValue={airline.name}
            onChange={(evt) => SetCompanyName(evt.target.value)} />
    </Grid>
    <Grid item xs={12}>
    <Autocomplete
                                disablePortal
                                id="combo-box-countries"
                                options={countries_names}
                                sx={{ width: 225 }}
                                defaultValue={airline.country}
                                onChange={(event, newValue) => {
                                    SetCountry(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} label="countries" />}
                                />
    </Grid>

                    <Grid item xs={12} container>
                        <Grid item xs={10}></Grid>
                        <Grid item xs={2} >
                            <Button variant="contained"
                                onClick={() => HandleSubmit()}>

                                update</Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Paper>
        </div>
    )
}

export default UpdateAirlines

// defaultValue={flight.remaining_ticets}