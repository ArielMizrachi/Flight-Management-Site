import React from 'react'
import { Link } from "react-router-dom";

// mui imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// redux
import {useDispatch, useSelector } from 'react-redux'
import {LogOut} from '../redux/Login/LoginSlice'
import { SelectToken, SelectSuper} from '../redux/Login/LoginSlice'
import {NotACustomer} from '../redux/Customer/CustomersSlice'

import UserIcon from './UserIcon';

const MyNav = () => {

  const dispatch = useDispatch()
  const token = useSelector(SelectToken)
  const is_super = useSelector(SelectSuper)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky"
              sx={{ flexGrow: 1, backgroundColor: '#34568B', borderColor: '#008B8B' }}>
        <Toolbar variant="dense">
        {token&&
          <UserIcon/>
        }
          <Typography color="inherit" sx={{ marginRight: 2 }}>
            <Link style={{textDecoration: 'none'}} to="/">home</Link>
          </Typography>
        {is_super&&
        
          <Typography color="inherit" sx={{ marginRight: 2 }}>
            <Link style={{textDecoration: 'none'}} to="/Customers">customers</Link>
          </Typography>
        }
        {is_super&&
          <Typography color="inherit" sx={{ marginRight: 2 }}>
            <Link style={{textDecoration: 'none'}} to="/Users">users</Link>
          </Typography>
          }
          {is_super&&
          <Typography color="inherit" sx={{ marginRight: 2 }}>
            <Link style={{textDecoration: 'none'}} to="/Tickets">tickets</Link>
          </Typography>
          
          }
          <Typography  color="inherit" sx={{ marginRight: 2 }}>
            <Link style={{textDecoration: 'none'}} to="/Countries">Countries</Link>
          </Typography>

          <Typography  color="inherit" sx={{ marginRight: 2 }}>
            <Link style={{textDecoration: 'none'}} to="/Airlines">Airlines</Link>
          </Typography>

          <Typography  color="inherit" sx={{ flexGrow: 1 }}>
            <Link style={{textDecoration: 'none'}} to="/Flights">Flights</Link>
          </Typography>
     
          {/* checking if looged in */}
          {token?
          <Typography color="inherit">
            <Link style={{textDecoration: 'none'}} to="/" onClick={()=>{dispatch(NotACustomer())
                                                                        setTimeout(() =>dispatch(LogOut()),200)}}>
            sign out
            </Link>
          </Typography>
            :     
          <Typography color="inherit" >
            <Link style={{textDecoration: 'none'}} to="/Login">Login</Link> / 
            <Link style={{textDecoration: 'none'}} to="/Register"> Register</Link>
          </Typography>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );

}

export default MyNav
