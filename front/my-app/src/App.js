import React, { useEffect } from 'react'
import { Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux'
import {CheckLogged} from './redux/LoginNRegister/LoginSlice'
import Stack from '@mui/material/Stack';

import MyNav from "./components/MyNav";
import RightSide from "./components/RightSide";
import LeftSide from "./components/LeftSide";
import { Box } from '@mui/system';

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
