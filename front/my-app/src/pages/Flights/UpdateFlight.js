import React, {useState, useEffect} from 'react'

// redux
import {useDispatch, useSelector} from "react-redux";
import {SelectOneFlight, UpdateFlightAsync, ErrorFlight, FlightErrorCalibration} from '../../redux/Flights/FlightSlice'
import {CountriesNames, GetCountriesNamesAsync} from '../../redux/Countries/CountriesSlice'
import {AirlinesNames, GetAirlinesNamesAsync} from '../../redux/Airlines/AirlineSlice'
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

import ReverseTime from '../../components/ReverseTime';

const UpdateFlights = () => {

    let navigate = useNavigate()
    const dispatch = useDispatch();
    const flight = useSelector(SelectOneFlight)    
    const countries_names =useSelector(CountriesNames)
    const airlines_names =useSelector(AirlinesNames)
    const error_chk =useSelector(ErrorFlight)
    
    const [company_id, SetCompanyId] = useState(flight.airline_company)
    const [origin_country_id, SetOriginCountryId] = useState(flight.origin_country)
    const [destenation_country_id, SetDestenationCountryId] = useState(flight.destenation_country)
    const [tickets, SetTickets] = useState(flight.remaining_ticets)
    const [departure_date, SetDepartureDate] = useState('')
    const [departure_time, SetDepartureTime] = useState('')
    const [landing_date, SetLandingDate] = useState('')
    const [landing_time, SetLandingTime] = useState('')


    // return to the flight page if refreshed or entered without a flight
  useEffect(() => {
    if (flight === 'null'){
        navigate("/Flights")
    }
    // calibration of the error and getting country and airline names
    dispatch(FlightErrorCalibration())
    dispatch(GetCountriesNamesAsync())
    dispatch(GetAirlinesNamesAsync())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    //   check if the flight was implemnted correctly
    useEffect(() => {
        if (error_chk === 'good'){
            dispatch(FlightErrorCalibration())
            navigate("/Flights" ,{state:{msg: `Flight number ${flight.id} was updated successfully` }})
        } 
        // in case of 401 
        if (error_chk === 'Please login again'){
            dispatch(FlightErrorCalibration())
            dispatch(LogOut())
            navigate("/Login/401")
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps     
    }, [error_chk]);  

    const HandleSubmit = () => {
        let flight_data = {
            "airline_company": company_id,
            "origin_country": origin_country_id,
            "destenation_country": destenation_country_id,
            "remaining_ticets": tickets,
            "departure_time": `${departure_date} ${departure_time}`,
            "landing_time": `${landing_date} ${landing_time}`}

        let id =flight.id    
        
        dispatch(UpdateFlightAsync({flight_data, id})) 
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
                                <Autocomplete
                                disablePortal
                                id="combo-box-countries"
                                options={airlines_names}
                                defaultValue={flight.airline_company}
                                sx={{ width: 225 }}
                                onChange={(event, newValue) => {
                                    SetCompanyId(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} label="Airline" />}
                                />                              
                    </Grid>
                                    
                    <Grid item xs={12} >
                        <Autocomplete
                                disablePortal
                                id="combo-box-countries"
                                options={countries_names}
                                sx={{ width: 225 }}
                                defaultValue={flight.origin_country}
                                onChange={(event, newValue) => {
                                    SetOriginCountryId(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} label="take off country" />}
                                />
                                
                    </Grid>
                    <Grid item xs={12}>
                    <Autocomplete
                            disablePortal
                            id="combo-box-countries"
                            options={countries_names}
                            sx={{ width: 225 }}
                            defaultValue={flight.destenation_country}
                            onChange={(event, newValue) => {
                                SetDestenationCountryId(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} label="landing country" />}
                            />
                            
                </Grid>
                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="tickets" inputProps={{ maxLength: 3 }} defaultValue={flight.remaining_ticets}
                            onChange={(evt) => SetTickets(evt.target.value)} />
                    </Grid>
                    <Grid item xs={12} container>
                        <Grid item xs={6}>
                            <TextField id="date" variant="outlined" type="date" InputLabelProps={{ shrink: true }} label="departure day"
                                onChange={(evt) => SetDepartureDate(ReverseTime(evt.target.value))} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="date" variant="outlined" type="time" InputLabelProps={{ shrink: true }} label="departure time"
                                onChange={(evt) => SetDepartureTime(evt.target.value)} />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} container>
                        <Grid item xs={6}>
                            <TextField id="date" variant="outlined" type="date" InputLabelProps={{ shrink: true }} label="landing day"
                                onChange={(evt) => SetLandingDate(ReverseTime(evt.target.value))} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="date" variant="outlined" type="time" InputLabelProps={{ shrink: true }} label="landing time"
                                onChange={(evt) => SetLandingTime(evt.target.value)} />
                        </Grid>
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

export default UpdateFlights

// defaultValue={flight.remaining_ticets}