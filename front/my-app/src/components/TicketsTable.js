import React from 'react'

// material ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {styled} from '@mui/system';

// redux
import {useDispatch} from "react-redux";
import {DeleteTicketAsync} from "../redux/Tickets/TicketSlice"





export default function AirlineTable({all_tickets}) {

  const dispatch = useDispatch();

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
            <TableCellHead align='left'>ticket id</TableCellHead>
            <TableCellHead align='left'>flight id</TableCellHead>
            <TableCellHead align='left'>origin country</TableCellHead>
            <TableCellHead align='left'>destenation country</TableCellHead>
            <TableCellHead align='left'>customer</TableCellHead>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        {/* table contents */}
        <TableBody>
          {all_tickets.map((ticket, ind) => (
            <TableRow key={ind} 
                      sx={{ border: 1.5,
                          background: ind%2 ===0 ? '#d9eefa' : ''
                          }}>
              <TableCell component="th" scope="row">{ticket.id}</TableCell>
              <TableCell align='left'>{ticket.id}</TableCell>
              <TableCell align='left'>{ticket.flight}</TableCell>
              <TableCell align='left'>{ticket.origin_country}</TableCell>
              <TableCell align='left'>{ticket.destenation_country}</TableCell>
              <TableCell align='left'>{ticket.customer}</TableCell>
              <TableCell align='left'>
              <IconButton align='left'
                      variant="contained" 
                      color='error' 
                      onClick={()=>dispatch(DeleteTicketAsync(ticket.id))}>
                        <DeleteIcon />
              </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  </div>
  )}
