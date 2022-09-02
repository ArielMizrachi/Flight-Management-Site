import React, {useState, useEffect} from 'react'

// redux
import {useDispatch, useSelector} from "react-redux";
import {SelectOneUser, UpdateUserAsync, ErrorUser, UserErrorCalibration} from '../../redux/Users/UsersSlice'
import {LogOut} from '../../redux/Login/LoginSlice'

// material ui
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// route import
import {useNavigate} from "react-router-dom";

const UpdateAirlines = () => {

    let navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector(SelectOneUser)
    const error_chk =useSelector(ErrorUser)
    
    const [username, SetUsername] = useState(user.username)
    const [password, SetPassword] = useState('')
    const [email, SetEmail] = useState(user.email)
    const [is_staff, SetStaff] = useState(user.is_staff)


    // return to the home page if refreshed or entered without a user
  useEffect(() => {
    if (user === 'null'){
        navigate("/")
    }
    // calibration of the error
    dispatch(UserErrorCalibration())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    //   check if the user was implemnted correctly
    useEffect(() => {
        if (error_chk === 'good'){
            dispatch(UserErrorCalibration())
            navigate("/Users" ,{state:{msg: `airline number ${user.id} was updated successfully` }})
        } 
        // in case of 401 
        if (error_chk === 'Please login again'){
            dispatch(UserErrorCalibration())
            dispatch(LogOut())
            navigate("/Login/401")
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps     
    }, [error_chk]);  

    const HandleSubmit = () => {
        let user_data = {
            "username": username,
            "password": password,
            "email": email,
            "is_staff": is_staff,}

        let id =user.id    
        
        dispatch(UpdateUserAsync({user_data, id})) 
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
                        <TextField id="outlined-basic" variant="outlined" label="username" defaultValue={user.username}
                            onChange={(evt) => SetUsername(evt.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="password" 
                            onChange={(evt) => SetPassword(evt.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="email" defaultValue={user.email}
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