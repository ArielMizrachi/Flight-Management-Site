json-server --watch db.json --port=3005


# done
- fix link update - Done
- build login - Done
- connect to server - Done
- jwt, local storage - Done
- connect to countries - Done
- fixing date func - Done +++
- logout -Done
- how to use reducers from other reducers -Done
- do add up and login error chk-Done
- do error function for redux-Done
- add token checkers for disconnects-Done
- update error implementation-Done
- get uselocation to work-Done
- show update and adding in the table-Done 
- learn mui more - Done ish
- add a trash can icon - Done
- build country
- add image possability-Done


#  goals
- make counry cards
- build register
- build airline company
- add to flight roll down foe both country and airline company
- fix flights url +flight update

- build user profile
- add permisson (staff, admin, guest, customer, user) -Kinda




# maybe  goals

- fix tickets
- cry - Done +++


import React from 'react'

// material ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {styled} from '@mui/system';

// redux
import {useDispatch} from "react-redux";
import {DeleteCountryAsync, GetOneCountryAsync} from '../redux/Countries/CountriesSlice'

// router
import { useNavigate } from "react-router-dom";



