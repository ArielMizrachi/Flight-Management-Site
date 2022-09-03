import React, { useState, useEffect } from 'react'

// mui export
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import StarsIcon from '@mui/icons-material/Stars';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';

// reudx export
import {SelectStaff, SelectSuper, SelectId, SelectToken} from '../redux/Login/LoginSlice'
import { useSelector, useDispatch} from 'react-redux'
import {CheckCustomerAsync, MyCustomer, CustomerId, GetOneCustomerAsync} from '../redux/Customer/CustomersSlice'
import {GetOneUserAsync} from '../redux/Users/UsersSlice'
import {CheckAirlineAsync , MyAirline} from '../redux/Airlines/AirlineSlice'




// router export
import { useNavigate } from "react-router-dom";


const UserIcon = () => {

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const is_staff = useSelector(SelectStaff)
  const is_super = useSelector(SelectSuper)
  const user_id =useSelector(SelectId)
  const customer_id =useSelector(CustomerId)

  // air line handling
  const is_airline =useSelector(MyAirline)

  // customer handling
  const token =useSelector(SelectToken)
  const customer =useSelector(MyCustomer)


    // dashboard handling
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    const handleClose = () => {
        setAnchorEl(null);
      };

    // checking for customers
  useEffect(() => {
    if (token){  
      dispatch(CheckCustomerAsync())
      dispatch(CheckAirlineAsync());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <div>
       {is_super ?
    //    super profile window
       <Box>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: '#cccc00'}}
            onClick={handleClick}
          >
            <StarsIcon />
          </IconButton>
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=> {handleClose() ;
                                 navigate(`/Countries`)}}>countries</MenuItem>
       <MenuItem onClick={()=> {handleClose() ;
                                 navigate(`/Tickets`)}}>tickets</MenuItem>
        <MenuItem onClick={()=> {handleClose() ;
                                 navigate(`/Users`)}}>users</MenuItem>
        <MenuItem onClick={()=> {handleClose() ;
                                 navigate(`/Customers`)}}>profiles</MenuItem>                         
      </Menu>
    </Box>
    : is_staff?
    // staff profile window
    <Box>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: '#0099ff' }}
            onClick={handleClick}
          >
            <SensorOccupiedIcon />
          </IconButton>
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
      {is_airline ?
        <MenuItem onClick={()=> {handleClose() ;
                                 navigate(`/MyFlights`)}}>my flights</MenuItem>
        :                         
        <MenuItem onClick={()=> {handleClose() ;
                                 navigate(`/AddAirline`)}}>become an airline</MenuItem> 
        }                                                   
      </Menu>
    </Box>
    :
    // regular mortal profile window
    <Box>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: '#299429' }}
            onClick={handleClick}
          >
            <PersonIcon />
          </IconButton>
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        
        <MenuItem onClick={()=> {handleClose() ;
                                 dispatch(GetOneUserAsync(user_id));
                                 setTimeout(() => navigate(`/UpdateUser`), 100)}}>update user</MenuItem>
         {customer ? 
         <Box>                   
        <MenuItem onClick={()=>{handleClose();
                                dispatch(GetOneCustomerAsync(customer_id));
                                setTimeout(() => navigate(`/UpdateCustomer`), 100)}}>update profile</MenuItem>

        <MenuItem onClick={()=>{handleClose() ;
                                 navigate(`/MyTickets`)}}>MyTickets</MenuItem>
          </Box>                      
            :
        <MenuItem onClick={()=> {handleClose() ;
                                 navigate(`/AddCustomer`)}}>become a customer</MenuItem>
         }
      </Menu>
    </Box>
    }
</div>


)}

export default UserIcon