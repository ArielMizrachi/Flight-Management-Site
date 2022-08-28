import React, { useState, useEffect } from 'react'

// mui import
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// redux import
import { LoginAsync } from '../../redux/LoginNRegister/LoginSlice'
import {useSelector, useDispatch} from "react-redux";
import {ErrorLoginNRegister, LNRErrorCalibration} from '../../redux/LoginNRegister/LoginSlice'

// router import
import { useNavigate, useParams} from "react-router-dom";





const Login = () => {

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [user_username, SetUser] = useState('')
  const [user_password, SetPassword] = useState('')

  // checking if ut was sent here form another page
  let params = useParams()
  const [chk_login, SetLogin] = useState(params)

  const error_chk =useSelector(ErrorLoginNRegister)
    

  // remove error if page refreshed
  useEffect(() => {
      dispatch(LNRErrorCalibration())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  //   check if the login was implemnted correctly 
  useEffect(() => {
      if (error_chk === 'good'){
          dispatch(LNRErrorCalibration())
          navigate("/")
         }   
        // calibrating the 401 error from the param 
      else {
        if(error_chk !== null){
            SetLogin('')
        }
      }    
         
      // eslint-disable-next-line react-hooks/exhaustive-deps     
    }, [error_chk]);

  return (
    <div>
      {/* {chk_login.note} */}

        <Grid container spacing={3} direction="column"  justifyContent="center" alignItems="center">
          
        <Paper sx={{ p: 10, margin: '30px', maxWidth: 500, flexGrow: 1}}>
          <Grid item xs={12}>
            <Typography variant="h5" component="div" gutterBottom>Please inset the following details</Typography>
          </Grid>

          {/* in case another page sent you here for a 401 error */}
        {chk_login.note === '401' &&
          <Grid item xs={12}>
            <Typography  component="div" gutterBottom color={'red'}>Please login again</Typography>
          </Grid>
          }

          <Grid item xs={12}>
            <Typography component="div" gutterBottom color={'red'}>{error_chk}</Typography>
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
                  // setTimeout(() =>navigate("/"),100)
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