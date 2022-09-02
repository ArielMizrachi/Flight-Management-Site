import React, { useState, useEffect } from 'react'

// mui import
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// redux import
import {AddUserAsync, ErrorUser, UserErrorCalibration} from '../../redux/Users/UsersSlice'
import {LoginAsync} from '../../redux/Login/LoginSlice'

import {useDispatch, useSelector} from "react-redux";


// router import
import { useNavigate } from "react-router-dom";


const Register = () => {

    const [username, SetUsername] = useState('')
    const [password, SetPassword] = useState('')
    const [email, SetEmail] = useState('')
    const [is_staff, SetStaff] = useState(false)
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const error_chk =useSelector(ErrorUser)


    // remove error if page refreshed
    useEffect(() => {
        dispatch(UserErrorCalibration())
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


    //   check if the airline was implemnted correctly
    useEffect(() => {
        if (error_chk === 'good'){
            dispatch(UserErrorCalibration())
            // login the registerd user
            dispatch(LoginAsync({"username":username,"password":password}))
            navigate("/" ,{state:{msg: `User ${username} was added to the database` }})
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps     
      }, [error_chk]);
    

    return (
        <div>
            <Paper sx={{ p: 10, margin: '30px', maxWidth: 500, flexGrow: 1 }}>

                <Grid container spacing={3} direction="column" alignItems="flex-start">
                    <Grid item xs={12}>
                        <Typography variant="h5" component="div" gutterBottom>Please inset the following details</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography  component="div" gutterBottom color={'red'}>{error_chk}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="username"
                            onChange={(evt) => SetUsername(evt.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="password"
                            onChange={(evt) => SetPassword(evt.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="email"
                            onChange={(evt) => SetEmail(evt.target.value)} />
                    </Grid>

                    <Grid item xs={12}>  
                    <FormControlLabel
                    label="staff?"
                    control = {<Checkbox  checked={is_staff} onChange={(evt) => SetStaff(evt.target.checked)} />}  
                    />   
                    </Grid>

                    <Grid item xs={12}>   
                    </Grid>
                
                    <Grid item xs={12} container>
                        <Grid item xs={10}></Grid>
                        <Grid item xs={2} >
                            <Button variant="contained"
                                    onClick={() =>{dispatch(AddUserAsync({
                                    "username": username,
                                    "password": password,
                                    "email"   : email,
                                    "is_staff": is_staff,
                                    }));}}>

                                submit</Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Paper>
        </div>
    )
}

export default Register




