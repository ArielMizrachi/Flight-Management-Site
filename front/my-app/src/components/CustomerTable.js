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
import {GetOneCustomerAsync, DeleteCustomerAsync} from "../redux/Customer/CustomersSlice"

// router
import { useNavigate } from "react-router-dom";



export default function CustomerTable({all_customers}) {



  const dispatch = useDispatch();
  let navigate = useNavigate();

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
            <TableCellHead align='left'>profile id</TableCellHead>
            <TableCellHead align='left'>first name</TableCellHead>
            <TableCellHead align='left'>last name</TableCellHead>
            <TableCellHead align='left'>address</TableCellHead>
            <TableCellHead align='left'>phone number</TableCellHead>
            <TableCellHead align='left'>credit card</TableCellHead>
            <TableCellHead align='left'>user</TableCellHead>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        {/* table contents */}
        <TableBody>
          {all_customers.map((customer, ind) => (
            <TableRow key={ind} 
                      sx={{ border: 1.5,
                          background: ind%2 ===0 ? '#d9eefa' : ''
                          }}>
              <TableCell component="th" scope="row">{customer.id}</TableCell>
              <TableCell align='left'>{customer.first_name}</TableCell>
              <TableCell align='left'>{customer.last_name}</TableCell>
              <TableCell align='left'>{customer.address}</TableCell>
              <TableCell align='left'>{customer.phone_no}</TableCell>
              <TableCell align='left'>{customer.credit_card_no}</TableCell>
              <TableCell align='left'>{customer.user}</TableCell>
              <TableCell align='left'>
              <Button align='left'
                      variant="contained"
                      sx={{color:'white', background:'#5B5EA6'}}
                      onClick={()=>{dispatch(GetOneCustomerAsync(customer.id));
                                    setTimeout(() => navigate(`/UpdateCustomer`), 50)}}>
                        update
              </Button>
              
              </TableCell>
              <TableCell align='left'>
              <IconButton align='left'
                      variant="contained" 
                      color='error' 
                      onClick={()=>dispatch(DeleteCustomerAsync(customer.id))}>
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
