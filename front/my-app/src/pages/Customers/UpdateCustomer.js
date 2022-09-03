import React, {useState, useEffect} from 'react'

// redux
import {useDispatch, useSelector} from "react-redux";
import {SelectOneCustomer, UpdateCustomerAsync, ErrorCustomer, CustomerErrorCalibration, DeleteCustomerAsync, NotACustomer} from '../../redux/Customer/CustomersSlice'
import {LogOut} from '../../redux/Login/LoginSlice'

// material ui
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// route import
import {useNavigate} from "react-router-dom";

const UpdateCustomer = () => {

    let navigate = useNavigate()
    const dispatch = useDispatch();
    const customer =useSelector(SelectOneCustomer)
    const error_chk =useSelector(ErrorCustomer)
    
    const [first_name, SetFirstName] = useState(customer.first_name)
    const [last_name, SetLastName] = useState(customer.last_name)
    const [address, SetAdress] = useState(customer.address)
    const [phone, SetPhone] = useState(customer.phone_no)
    const [credit_card, SetCreditCard] = useState(customer.credit_card_no)


    // return to the home page if refreshed or entered without a airline
  useEffect(() => {
    if (customer === 'null'){
        navigate("/")
    }
    // calibration of the error
    dispatch(CustomerErrorCalibration())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    //   check if the customer was implemnted correctly
    useEffect(() => {
        if (error_chk === 'good'){
            dispatch(CustomerErrorCalibration())
            navigate("/" ,{state:{msg: `customer ${customer.first_name} was updated successfully` }})
        } 

        // in case of a profile delete 
        if (error_chk === 'deleted'){
            dispatch(CustomerErrorCalibration())
            dispatch(NotACustomer())
            navigate("/" ,{state:{msg: `Goodbye profile` }})
        } 

        // in case of 401 
        if (error_chk === 'Please login again'){
            dispatch(CustomerErrorCalibration())
            dispatch(LogOut())
            navigate("/Login/401")
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps     
    }, [error_chk]);  

    const HandleSubmit = () => {
        let customer_data = {
            "first_name": first_name,
            "last_name": last_name,
            "address": address,
            "phone_no": phone,
            "credit_card_no": credit_card,}

        let id =customer.id    
        
        dispatch(UpdateCustomerAsync({customer_data, id})) 
    }
    
    return (
        <div>
            {JSON.stringify(customer)}
<Paper sx={{ p: 2, margin: '30px', maxWidth: 500, flexGrow: 1 }}>

<Grid container spacing={3} direction="column" alignItems="flex-start">
    <Grid item xs={12}>
        <Typography variant="h5" component="div" gutterBottom>Please inset the following details</Typography>
    </Grid>

    <Grid item xs={12}>
        <Typography  component="div" gutterBottom color={'red'}>{error_chk}</Typography>
    </Grid>

    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="first name" defaultValue={customer.first_name}
                            onChange={(evt) => SetFirstName(evt.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="last name" defaultValue={customer.last_name}
                            onChange={(evt) => SetLastName(evt.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="adress" defaultValue={customer.address}
                            onChange={(evt) => SetAdress(evt.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="phone" defaultValue={customer.phone_no}
                            onChange={(evt) => SetPhone(evt.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField id="outlined-basic" variant="outlined" label="credit card" defaultValue={customer.credit_card_no}
                            onChange={(evt) => SetCreditCard(evt.target.value)} />
                    </Grid>
                    
                    <Grid item xs={12} container>
                    <Grid item xs={2} >
                            <Button variant="contained"
                                    color='error'
                                    onClick={()=>dispatch(DeleteCustomerAsync(customer.id))}>

                                delete</Button>
                        </Grid>
                        <Grid item xs={2} ></Grid>
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

export default UpdateCustomer

