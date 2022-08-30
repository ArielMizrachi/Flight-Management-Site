import React, { useEffect } from 'react'

// router imports
import { Outlet } from "react-router-dom";
import {CheckLogged} from './redux/LoginNRegister/LoginSlice'

// redux imports
import { useDispatch } from 'react-redux'

// mui imports
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';

// commponents imports
import MyNav from "./components/MyNav";
import RightSide from "./components/RightSide";
import LeftSide from "./components/LeftSide";

// my css imports
import './css/MyCss.css'

function App() {

  const dispatch = useDispatch()

  // make sure the if the user is looged or not
  useEffect(() => {
    dispatch(CheckLogged());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <MyNav/>
    <Stack direction={'row'} spacing={2}>
      <Box flex={1}><RightSide/></Box>
      <Box flex={8}><Outlet /></Box>
      <Box flex={1}><LeftSide/></Box>
    </Stack> 
    </div>
  );
}

export default App;
