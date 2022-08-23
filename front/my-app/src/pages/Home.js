import React, { useEffect } from 'react'

// import Button from '@mui/material/Button';
import {SelectToken, SelectStaff, SelectUser} from '../redux/LoginNRegister/LoginSlice'
import { useSelector, useDispatch } from 'react-redux'
import {CheckLogged} from '../redux/LoginNRegister/LoginSlice'



const Home = () => {

  useEffect(() => {
    dispatch(CheckLogged());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch()
  const token = useSelector(SelectToken);
  const username = useSelector(SelectUser)
  const is_staff = useSelector(SelectStaff)

// console.log(JSON.stringify(token))
  
  return (
    <div> 
      home <br/>
      {JSON.stringify(token)} <br/>
      {username} <br/>
      {is_staff !== true && <div> not staff and probably not logged in either </div>}  <br/>

    </div>
  )
}

export default Home