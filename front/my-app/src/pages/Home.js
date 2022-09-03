import React from 'react'
// // redux imports
import { useSelector} from 'react-redux'
import {SelectUser} from '../redux/Login/LoginSlice'

// // router imports
import {useLocation} from "react-router-dom";

// mui imports
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import cloud from '../css/cloud.jpg'

const Home = () => {

  // import {SelectToken, SelectStaff, SelectUser, SelectSuper, SelectId} from '../redux/Login/LoginSlice'
  // const token = useSelector(SelectToken);
  const username = useSelector(SelectUser)
  // const is_staff = useSelector(SelectStaff)
  // const is_super = useSelector(SelectSuper)
  // const user_id = useSelector(SelectId)
  const location = useLocation()
  
  return (
    <div> 
      {/* {location.state && <Typography variant="h5" component="div" gutterBottom color={'green'}>{location.state.msg}</Typography>}
      home <br/>
      {JSON.stringify(token)} <br/>
      {user_id} <br/>
      {is_super ? 'is admin' : 'not an admin'} <br/>
      {username} <br/>
      {is_staff !== true && <div> not staff and probably not logged in either </div>}  <br/> */}

<Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${cloud})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {/* {<img style={{ display: 'none' }} src={`url(${cloud})`} alt={`url(${cloud})`}/>} */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              hello
            </Typography>
            {username &&
            <Typography variant="h5" color="inherit" paragraph>
              {username}
            </Typography>
            }
          </Box>
        </Grid>
      </Grid>
    </Paper>
    <Typography variant="h5" color="inherit" paragraph>
              welcome to my site I hope you will have a great time here
            </Typography>
  {location.state && <Typography variant="h5" component="div" gutterBottom color={'green'}>{location.state.msg}</Typography>}

    </div>
  )
}

export default Home