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
import {useSelector, useDispatch} from "react-redux";
import {GetOneAirlineAsync, DeleteAirlineAsync} from "../redux/Airlines/AirlineSlice"
import {SelectSuper} from "../redux/Login/LoginSlice"


// router
import { useNavigate } from "react-router-dom";



export default function AirlineTable({all_airlines}) {



  const dispatch = useDispatch();
  let navigate = useNavigate();
  const is_super = useSelector(SelectSuper)

  // custom table head color
  const TableCellHead = styled(TableCell)({
      color:'white'
  })
  return (
    <div>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650,
                   border: 2 }} 
                   aria-label="simple table"  
                   size="small" >

        <TableHead sx={{ border: 2 ,  
                         bgcolor: '#34568B',
                      }} >
                          
          {/* table headers */}
          <TableRow>
            <TableCellHead align='left'>airliner id</TableCellHead>
            <TableCellHead align='left'>comany name</TableCellHead>
            <TableCellHead align='left'>origin country</TableCellHead>
            <TableCellHead align='left'>creating user</TableCellHead>
            {is_super && <TableCell></TableCell>}
            {is_super && <TableCell></TableCell>}
          </TableRow>
        </TableHead>

        {/* table contents */}
        <TableBody>
          {all_airlines.map((airline, ind) => (
            <TableRow key={ind} 
                      sx={{ border: 1.5,
                          background: ind%2 ===0 ? '#d9eefa' : ''
                          }}>
              <TableCell component="th" scope="row">{airline.id}</TableCell>
              <TableCell align='left'>{airline.name}</TableCell>
              <TableCell align='left'>{airline.country}</TableCell>
              <TableCell align='left'>{airline.user}</TableCell>
              {is_super &&            
              <TableCell align='left'>
              <Button align='left'
                      variant="contained"
                      sx={{color:'white', background:'#5B5EA6'}}
                      onClick={()=>{dispatch(GetOneAirlineAsync(airline.id));
                                    setTimeout(() => navigate(`/UpdateAirline`), 50)}}>
                        update
              </Button>
              </TableCell>
              }
              {is_super && 
             
              <TableCell align='left'>
              <IconButton align='left'
                      variant="contained" 
                      color='error' 
                      onClick={()=>dispatch(DeleteAirlineAsync(airline.id))}>
                        <DeleteIcon />
              </IconButton>
              </TableCell>
                }
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  </div>
  )}
