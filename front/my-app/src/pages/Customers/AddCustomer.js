import React, { useState, useEffect } from 'react'

// mui import
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// redux import
import {AddCustomerAsync, ErrorCustomer, CustomerErrorCalibration, CheckCustomerAsync} from '../../redux/Customer/CustomersSlice'
import {useDispatch, useSelector} from "react-redux";
import {LogOut} from '../../redux/Login/LoginSlice'
import {IsNowACustomer} from '../../redux/Customer/CustomersSlice'

// router import
import { useNavigate } from "react-router-dom";


const AddCustomer = () => {

    const [first_name, SetFirstName] = useState('')
    const [last_name, SetLastName] = useState('')
    const [address, SetAdress] = useState('')
    const [phone, SetPhone] = useState('')
    const [credit_card, SetCreditCard] = useState('')

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const error_chk =useSelector(ErrorCustomer)


    // remove error if page refreshed
    useEffect(() => {
        dispatch(CustomerErrorCalibration())
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


    //   check if the airline was implemnted correctly
    useEffect(() => {
        if (error_chk === 'good'){
            dispatch(CustomerErrorCalibration())
            // you need to check for the state of the customer id to change
            dispatch(IsNowACustomer())
            dispatch(CheckCustomerAsync())
            navigate("/" ,{state:{msg: `Welcome our new customer ${first_name} ` }})
        } 
        // in case of 401 
        if (error_chk === 'Please login again'){
            dispatch(CustomerErrorCalibration())
            dispatch(LogOut())
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
                        <Typography  component="div" gutterBottom color={'red'}>{error_chk}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="first name"
                            onChange={(evt) => SetFirstName(evt.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="last name"
                            onChange={(evt) => SetLastName(evt.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="adress"
                            onChange={(evt) => SetAdress(evt.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="phone"
                            onChange={(evt) => SetPhone(evt.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="credit card"
                            onChange={(evt) => SetCreditCard(evt.target.value)} />
                    </Grid>

                    <Grid item xs={12} container>
                        <Grid item xs={10}></Grid>
                        <Grid item xs={2} >
                            <Button variant="contained"
                                    onClick={() =>{dispatch(AddCustomerAsync({
                                    "first_name": first_name,
                                    "last_name": last_name,
                                    "address": address,
                                    "phone_no": phone,
                                    "credit_card_no": credit_card,
                                    }));}}>

                                submit</Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Paper>
        </div>
    )
}

export default AddCustomer




