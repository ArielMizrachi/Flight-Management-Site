import React, { useState, useEffect} from 'react'

// redux
import {useDispatch, useSelector} from "react-redux";
import {SelectOneFlight, UpdateFlightAsync} from '../../redux/Flights/FlightSlice'
import {CheckLogged} from '../../redux/LoginNRegister/LoginSlice'

// material ui
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// route import
import { useNavigate } from "react-router-dom";

import ReverseTime from '../../components/ReverseTime';

const UpdateFlights = () => {

    const flight = useSelector(SelectOneFlight)
    const dispatch = useDispatch();
    
    const [company_id, SetCompanyId] = useState(flight.airline_company)
    const [origin_country_id, SetOriginCountryId] = useState(flight.origin_country)
    const [destenation_country_id, SetDestenationCountryId] = useState(flight.destenation_country)
    const [tickets, SetTickets] = useState(flight.remaining_ticets)
    const [departure_date, SetDepartureDate] = useState('')
    const [departure_time, SetDepartureTime] = useState('')
    const [landing_date, SetLandingDate] = useState('')
    const [landing_time, SetLandingTime] = useState('')

    let navigate = useNavigate()

     // make sure the if the user is looged or not
    useEffect(() => {
        dispatch(CheckLogged());
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <div>

            <Paper sx={{ p: 2, margin: '30px', maxWidth: 500, flexGrow: 1 }}>

                <Grid container spacing={3} direction="column" alignItems="flex-start">
                    <Grid item xs={12}>
                        <Typography variant="h5" component="div" gutterBottom>Please updatate the following details</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="comany id" defaultValue={flight.airline_company}
                            onChange={(evt) => SetCompanyId(evt.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="origin country id" defaultValue={flight.origin_country}
                            onChange={(evt) => SetOriginCountryId(evt.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="destination country id" defaultValue={flight.destenation_country}
                            onChange={(evt) => SetDestenationCountryId(evt.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="tickets" defaultValue={flight.remaining_ticets}
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
                                onClick={() => {dispatch(UpdateFlightAsync({
                                    "id":flight.id,
                                    "airline_company": company_id,
                                    "origin_country": origin_country_id,
                                    "destenation_country": destenation_country_id,
                                    "remaining_ticets": tickets,
                                    "departure_time": `${departure_date} ${departure_time}`,
                                    "landing_time": `${landing_date} ${landing_time}`}));

                                    navigate("/Flights")}}>

                                update</Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Paper>
        </div>
    )
}

export default UpdateFlights