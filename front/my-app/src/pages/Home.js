import React from 'react'

// import Button from '@mui/material/Button';
import {SelectToken, SelectStaff, SelectUser} from '../redux/LoginNRegister/LoginSlice'
import { useSelector} from 'react-redux'




const Home = () => {

  const token = useSelector(SelectToken);
  const username = useSelector(SelectUser)
  const is_staff = useSelector(SelectStaff)

  
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