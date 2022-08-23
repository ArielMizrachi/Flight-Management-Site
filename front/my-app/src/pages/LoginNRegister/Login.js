import React, { useState } from 'react'

// mui import
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// redux import
import { LoginAsync } from '../../redux/LoginNRegister/LoginSlice'
import { useDispatch } from "react-redux";

// router import
import { useNavigate } from "react-router-dom";





const Login = () => {

  const [user_username, SetUser] = useState('')
  const [user_password, SetPassword] = useState('')

  const dispatch = useDispatch();
  let navigate = useNavigate();

  return (
    <div>

      

        <Grid container spacing={3} direction="column"  justifyContent="center" alignItems="center">
          
        <Paper sx={{ p: 10, margin: '30px', maxWidth: 500, flexGrow: 1}}>
          <Grid item xs={12}>
            <Typography variant="h5" component="div" gutterBottom>Please inset the following details</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-basic" variant="outlined" label="Username"
              onChange={(evt) => SetUser(evt.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField id="outlined-basic" variant="outlined" label="Password"
              onChange={(evt) => SetPassword(evt.target.value)} />
          </Grid>
          <Grid item xs={12} container>
            <Grid item xs={10}></Grid>
            <Grid item xs={2} >

              <Button variant="contained"
                onClick={() => {
                  dispatch(LoginAsync({"username":user_username,"password":user_password}));
                  setTimeout(() =>navigate("/"),100)
                }}>

                Login
              </Button>
            </Grid>
          </Grid>
          </Paper>
        </Grid>
      
    </div>
  )
}

export default Login