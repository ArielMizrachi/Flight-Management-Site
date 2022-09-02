import React, { useEffect } from 'react'

// mui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// redux
import { useSelector, useDispatch } from 'react-redux'
import {GetUsersAsync, AllUsers} from '../../redux/Users/UsersSlice'

// comp
import UsersTable from '../../components/UsersTable';

// router import
import {useLocation} from "react-router-dom";





const Users = () => {

  const all_users =useSelector(AllUsers)
  const dispatch = useDispatch()
  const location = useLocation()

   // get all of the users
  useEffect(() => {
    dispatch(GetUsersAsync());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Grid container spacing={2} >

      {/* show add and update messages */}
      <Grid item xs={12} container  justifyContent="center" alignItems="center">
         {location.state &&
          <Typography variant="h5" component="div" gutterBottom color={'green'}>{location.state.msg}</Typography>}
      </Grid>

      {/* showing all the users */}
        <Grid item xs={10}>
        <UsersTable all_users={all_users}/>
        </Grid>

       </Grid> 
      

      

        

    </div>
  )
}

export default Users