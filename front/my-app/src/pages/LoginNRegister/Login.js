import React, { useState, useEffect } from 'react'

// mui import
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// redux import
import {useSelector, useDispatch} from "react-redux";
import {ErrorLoginNRegister, LNRErrorCalibration, LoginAsync } from '../../redux/Login/LoginSlice'

// router import
import { useNavigate, useParams, Link} from "react-router-dom";





const Login = () => {

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [user_username, SetUser] = useState('')
  const [user_password, SetPassword] = useState('')

  const [usernameverifier, SetUserVeryfier] = useState(false)
  const [passwordverifier, SetPasswordVeryfier] = useState(false)

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

    const HandleSubmit = () => {
      let chk = 0
      //varifacation before sending to the server
      if (user_username === '') {SetUserVeryfier('please insert a name');chk=chk+1} 
                           else {SetUserVeryfier(false)}
      if (user_password === '') {SetPasswordVeryfier('please insert a password'); chk=chk+1} 
                           else {SetPasswordVeryfier(false)}
    // if there are no chk problems send it to the server
    if (chk === 0 ){    
    dispatch(LoginAsync({"username":user_username,"password":user_password}))
    }
  }


  return (
    <div>
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
            <Typography component="div" gutterBottom color={'red'}>
              { usernameverifier === false && passwordverifier === false ? error_chk : ""}
              </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-basic" variant="outlined" label="Username"
              onChange={(evt) => SetUser(evt.target.value)} />

              {usernameverifier !== false &&
              <Typography  component="div" gutterBottom color={'red'}>{usernameverifier}</Typography>
              }

          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-basic" variant="outlined" label="Password"
              onChange={(evt) =>SetPassword(evt.target.value)} />

              {passwordverifier !== false &&
              <Typography  component="div" gutterBottom color={'red'}>{passwordverifier}</Typography>
              }

          </Grid>

          <Grid item xs={12} container>
            <Grid item xs={10}></Grid>
            <Grid item xs={2} >

              <Button variant="contained"
                onClick={() => {HandleSubmit()}}>

                Login
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}  justifyContent="flex-start" alignItems="flex-end">
            <Typography  component="div" gutterBottom>dont have an acount? create one 
               <Link style={{color: 'blue'}} to="/Register"> here</Link>
            </Typography>
          </Grid>
          </Paper>
        </Grid>
      
    </div>
  )
}

export default Login