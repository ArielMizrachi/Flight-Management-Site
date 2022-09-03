import React, { useState } from 'react'

// mui export
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import StarsIcon from '@mui/icons-material/Stars';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';

// reudx export
import {SelectStaff, SelectSuper} from '../redux/Login/LoginSlice'
import { useSelector} from 'react-redux'

// router export
import { useNavigate } from "react-router-dom";


const UserIcon = () => {

  const is_staff = useSelector(SelectStaff)
  const is_super = useSelector(SelectSuper)
  let navigate = useNavigate();

    // dashboard handling
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    const handleClose = () => {
        setAnchorEl(null);
      };

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
                                 navigate(`/UpdateCountry`)}}>profiles</MenuItem>                         
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
    }
</div>


)}

export default UserIcon