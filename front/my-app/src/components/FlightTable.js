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

// redux
import {useDispatch} from "react-redux";
import {DeleteFlightAsync, GetOneFlightAsync} from '../redux/Flights/FlightSlice'

// router
import { useNavigate } from "react-router-dom";



export default function FlightTable({all_flights}) {



  const dispatch = useDispatch();
  let navigate = useNavigate();

  return (
    <div>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650,
                   border: 2 }} 
                   aria-label="simple table"  
                   size="small" >

        <TableHead sx={{ border: 2 ,  
                         bgcolor: 'primary.main'    }} >
                          
          {/* table headers */}
          <TableRow>
            <TableCell align='left'>flight id</TableCell>
            <TableCell align='left'>company id</TableCell>
            <TableCell align='left'>origin country id</TableCell>
            <TableCell align='left'>destination country id</TableCell>
            <TableCell align='left'>departure time</TableCell>
            <TableCell align='left'>landing time</TableCell>
            <TableCell align='left'>ticets remaining</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        {/* table contents */}
        <TableBody>
          {all_flights.map((flight, ind) => (
            <TableRow key={ind} 
                      sx={{ border: 1.5}}>
              <TableCell component="th" scope="row">{flight.id}</TableCell>
              <TableCell align='left'>{flight.airline_company}</TableCell>
              <TableCell align='left'>{flight.origin_country}</TableCell>
              <TableCell align='left'>{flight.destenation_country}</TableCell>
              <TableCell align='left'>{flight.departure_time}</TableCell>
              <TableCell align='left'>{flight.landing_time}</TableCell>
              <TableCell align='left'>{flight.remaining_ticets}</TableCell>
              <TableCell align='left'>
              <Button align='left'
                      variant="contained"
                      onClick={()=>{dispatch(GetOneFlightAsync(flight.id));
                                    setTimeout(() => navigate("/UpdateFlight"), 50)}}>
                        update
              </Button>
              
              </TableCell>
              <TableCell align='left'>
              <Button align='left'
                      variant="contained" 
                      color='error' 
                      onClick={()=>dispatch(DeleteFlightAsync(flight.id))}>
                        delete
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  </div>
  )}
