import React from 'react'

// import Button from '@mui/material/Button';
import {SelectToken, SelectStaff, SelectUser, SelectSuper, SelectId} from '../redux/Login/LoginSlice'
import { useSelector} from 'react-redux'

import {useLocation} from "react-router-dom";

import Typography from '@mui/material/Typography';

const Home = () => {

  const token = useSelector(SelectToken);
  const username = useSelector(SelectUser)
  const is_staff = useSelector(SelectStaff)
  const is_super = useSelector(SelectSuper)
  const user_id = useSelector(SelectId)
  const location = useLocation()
  
  return (
    <div> 
      {location.state && <Typography variant="h5" component="div" gutterBottom color={'green'}>{location.state.msg}</Typography>}
      home <br/>
      {JSON.stringify(token)} <br/>
      {user_id} <br/>
      {is_super ? 'is admin' : 'not an admin'} <br/>
      {username} <br/>
      {is_staff !== true && <div> not staff and probably not logged in either </div>}  <br/>

    </div>
  )
}

export default Home