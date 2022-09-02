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
import {GetOneUserAsync, DeleteUserAsync} from "../redux/Users/UsersSlice"

// router
import { useNavigate } from "react-router-dom";



export default function UserTable({all_users}) {



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
            <TableCellHead align='left'>user id</TableCellHead>
            <TableCellHead align='left'>username</TableCellHead>
            <TableCellHead align='left'>email</TableCellHead>
            <TableCellHead align='left'>staff</TableCellHead>
            <TableCellHead align='left'>superuser</TableCellHead>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        {/* table contents */}
        <TableBody>
          {all_users.map((user, ind) => (
            <TableRow key={ind} 
                      sx={{ border: 1.5,
                          background: ind%2 ===0 ? '#d9eefa' : ''
                          }}>
              <TableCell component="th" scope="row">{user.id}</TableCell>
              <TableCell align='left'>{user.username}</TableCell>
              <TableCell align='left'>{user.email}</TableCell>
              <TableCell align='left'>{user.is_staff ? 'yes' : 'no'}</TableCell>
              <TableCell align='left'>{user.is_superuser ? 'yes' : 'no'}</TableCell>
              <TableCell align='left'>
              <Button align='left'
                      variant="contained"
                      sx={{color:'white', background:'#5B5EA6'}}
                      onClick={()=>{dispatch(GetOneUserAsync(user.id));
                                    setTimeout(() => navigate(`/UpdateUser`), 50)}}>
                        update
              </Button>
              
              </TableCell>
              <TableCell align='left'>
              <IconButton align='left'
                      variant="contained" 
                      color='error' 
                      onClick={()=>dispatch(DeleteUserAsync(user.id))}>
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
