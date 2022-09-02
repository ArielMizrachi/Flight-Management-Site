import React, { useState, useEffect } from 'react'

// mui import
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// redux import
import {AddCountryAsync, ErrorCountry, CountryErrorCalibration} from '../../redux/Countries/CountriesSlice'
import {useDispatch, useSelector} from "react-redux";
import {LogOut} from '../../redux/Login/LoginSlice'

// router import
import { useNavigate } from "react-router-dom";

const AddCountry = () => {

    const [name, SetName] = useState('')
    const [flag, SetFlag] = useState('')
    

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const error_chk =useSelector(ErrorCountry)
    

    // remove error if page refreshed
    useEffect(() => {
        dispatch(CountryErrorCalibration())
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


    //   check if the flight was implemnted correctly
    useEffect(() => {
        if (error_chk === 'good'){
            console.log(flag)
            dispatch(CountryErrorCalibration())
            navigate("/Countries" ,{state:{msg: `The country ${name} was added to the database` }})
        } 
        // in case of 401 
        if (error_chk === 'Please login again'){
            dispatch(CountryErrorCalibration())
            dispatch(LogOut())
            navigate("/Login/401")
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps     
      }, [error_chk]);
    
    const HandleSubmit = () => {
        let form_data = new FormData();
        form_data.append("name", name, );
        form_data.append("flag", flag);
        dispatch(AddCountryAsync(form_data))    
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
                        <TextField id="outlined-basic" variant="outlined" label="country name"
                            onChange={(evt) => SetName(evt.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                    <Button variant="contained" 
                            component="label" 
                            style={{color: 'white', background:'#5B5EA6'}}
                            onChange={(evt)=>SetFlag(evt.target.files[0])}>
                            Upload country flag
                            <input hidden accept="image/*" multiple type="file" />
                     </Button>
                    </Grid>

                    <Grid item xs={12} container>
                        <Grid item xs={10}></Grid>
                        <Grid item xs={2} >
                            <Button variant="contained"
                                onClick={() =>HandleSubmit()}>

                                submit</Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Paper>
        </div>
    )
}

export default AddCountry




// onClick={() =>{HandleSubmit()}}>