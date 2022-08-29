import React from 'react'
import { Link } from "react-router-dom";

// my css imports
import '../css/MyLink.css'

// mui imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

// redux
import {useDispatch, useSelector } from 'react-redux'
import {LogOut} from '../redux/LoginNRegister/LoginSlice'

import { SelectToken} from '../redux/LoginNRegister/LoginSlice'

const MyNav = () => {

  const dispatch = useDispatch()
  const token = useSelector(SelectToken)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky"
              sx={{ flexGrow: 1, color: '#008B8B', backgroundColor: '#34568B', borderColor: '#008B8B' }}>
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography color="inherit" sx={{ marginRight: 2 }}>
            <Link style={{textDecoration: 'none'}} to="/">home</Link>
          </Typography>

          <Typography  color="inherit" sx={{ marginRight: 2 }}>
            <Link style={{textDecoration: 'none'}} to="/Countries">Countries</Link>
          </Typography>

          <Typography  color="inherit" sx={{ flexGrow: 1 }}>
            <Link style={{textDecoration: 'none'}} to="/Flights">Flights</Link>
          </Typography>


          {/* checking if looged in */}
          {token?
          <Typography color="inherit">
            <Link style={{textDecoration: 'none'}} to="/" onClick={()=>setTimeout(() =>dispatch(LogOut()),200)}>sign out</Link>
          </Typography>
            :
          <Typography color="inherit" >
            <Link style={{textDecoration: 'none'}} to="/Login">Login</Link>
          </Typography>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );

}

export default MyNav
