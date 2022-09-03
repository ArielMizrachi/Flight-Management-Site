import React, { useEffect } from 'react'
import { Link } from "react-router-dom";

// mui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// redux
import { useSelector, useDispatch } from 'react-redux'
import {GetCustomersAsync, AllCustomers} from '../../redux/Customer/CustomersSlice'

// comp
import CustomerTable from '../../components/CustomerTable';

// router import
import {useLocation} from "react-router-dom";





const Customers = () => {

  const all_customers =useSelector(AllCustomers)
  const dispatch = useDispatch()
  const location = useLocation()

   // get all of the customers
  useEffect(() => {
    dispatch(GetCustomersAsync());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Grid container spacing={2} >

      <Grid item xs={12} container >
         <Button variant="contained" style={{color: 'white', background:'#88B04B', marginTop: 12 }}>
        <Link to="/AddCustomer" style={{color: 'white', textDecoration: 'none'}}>add a customer</Link>
        </Button>
      </Grid>

      <Grid item xs={12} container  justifyContent="center" alignItems="center">
         {/* show add and update messages */}
         {location.state &&
          <Typography variant="h5" component="div" gutterBottom color={'green'}>{location.state.msg}</Typography>}
      </Grid>

      {/* showing all the airlines */}
        <Grid item xs={10}>
        <CustomerTable all_customers={all_customers}/>
        </Grid>

       </Grid> 
      

      

        

    </div>
  )
}

export default Customers