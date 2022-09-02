import React, {useState, useEffect} from 'react'

// redux
import {useDispatch, useSelector} from "react-redux";
import {SelectOneCountry, UpdateCountryAsync, ErrorCountry, CountryErrorCalibration} from '../../redux/Countries/CountriesSlice'
import {LogOut} from '../../redux/Login/LoginSlice'

// material ui
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// route import
import {useNavigate} from "react-router-dom";


const UpdateCountry = () => {

    let navigate = useNavigate()
    const dispatch = useDispatch();
    const country = useSelector(SelectOneCountry)
    const error_chk =useSelector(ErrorCountry)
    
    const [name, SetName] = useState(country.name)
    const [flag, SetFlag] = useState('')
    

    // return to the flight page if refreshed or entered without a flight
    useEffect(() => {
        if (country === 'null'){
            navigate("/Countries")
        }
        // calibration of the error
        dispatch(CountryErrorCalibration())
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    

    //   check if the flight was implemnted correctly
    useEffect(() => {
        if (error_chk === 'good'){
            dispatch(CountryErrorCalibration())
            navigate("/Countries" ,{state:{msg: `country ${name} was updated successfully` }})
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
        let id = country.id
        let form_data = new FormData();
        form_data.append("name", name);
        form_data.append("flag", flag);
        dispatch(UpdateCountryAsync({form_data, id}))    
    }

    return (
        <div>

            <Paper sx={{ p: 2, margin: '30px', maxWidth: 500, flexGrow: 1 }}>

                <Grid container spacing={3} direction="column" alignItems="flex-start">
                    <Grid item xs={12}>
                        <Typography variant="h5" component="div" gutterBottom>Please updatate the following details</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography component="div" gutterBottom color={'red'}>{error_chk}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="country name" defaultValue={country.name}
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

                                update</Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Paper>
        </div>
    )
}

export default UpdateCountry

