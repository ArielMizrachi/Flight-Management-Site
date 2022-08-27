import React, { useState, useEffect } from 'react'

// mui import
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// redux import
import {AddFlightAsync, ErrorFlight, ErrorCalibration} from '../../redux/Flights/FlightSlice'
import {useDispatch, useSelector} from "react-redux";
import {CheckLogged} from '../../redux/LoginNRegister/LoginSlice'

// router import
import { useNavigate } from "react-router-dom";

import ReverseTime from '../../components/ReverseTime';

const AddFlights = () => {

    const [company, SetCompanyId] = useState('')
    const [origin_country, SetOriginCountryId] = useState('')
    const [destenation_country, SetDestenationCountryId] = useState('')
    const [tickets, SetTickets] = useState('')
    const [departure_date, SetDepartureDate] = useState('')
    const [departure_time, SetDepartureTime] = useState('')
    const [landing_date, SetLandingDate] = useState('')
    const [landing_time, SetLandingTime] = useState('')
    // const [error_msg, SetError] = useState(null)

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const error_chk =useSelector(ErrorFlight)
    

    // make sure the if the user is looged or not
    useEffect(() => {
        dispatch(CheckLogged());
        dispatch(ErrorCalibration())
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


    //   check if the flight was implemnted correctly
    useEffect(() => {
        if (error_chk === 'good'){
            dispatch(ErrorCalibration())
            navigate("/Flights")
        }  
        if (error_chk === 'Please login again'){
            dispatch(ErrorCalibration())
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
                        <Typography variant="h6" component="div" gutterBottom color={'red'}>{error_chk}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="comany"
                            onChange={(evt) => SetCompanyId(evt.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="origin country"
                            onChange={(evt) => SetOriginCountryId(evt.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="destination country"
                            onChange={(evt) => SetDestenationCountryId(evt.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="tickets"
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
                                onClick={() =>{dispatch(AddFlightAsync({
                                    "airline_company": company,
                                    "origin_country": origin_country,
                                    "destenation_country": destenation_country,
                                    "remaining_ticets": tickets,
                                    "departure_time": `${departure_date} ${departure_time}`,
                                    "landing_time": `${landing_date} ${landing_time}`}));}}>

                                submit</Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Paper>
        </div>
    )
}

export default AddFlights




