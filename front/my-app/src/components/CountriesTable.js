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



export default function CountriesTable({all_countries}) {

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
            <TableCellHead align='left'>country id</TableCellHead>
            <TableCellHead align='left'>country name</TableCellHead>
            <TableCellHead align='left'>country flag</TableCellHead>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        {/* table contents */}
        <TableBody>
          {all_countries.map((country, ind) => (
            <TableRow key={ind} 
                      sx={{ border: 1.5}}>
              <TableCell component="th" scope="row">{country.id}</TableCell>
              <TableCell align='left'>{country.name}</TableCell>
              <TableCell align='left'>{country.flag}</TableCell>
              <TableCell align='left'>
              <Button align='left'
                      variant="contained"
                      sx={{color:'white', background:'#5B5EA6'}}
                      onClick={()=>{dispatch(GetOneCountryAsync(country.id));
                                    setTimeout(() => navigate(`/UpdateCountry/${country.id}`), 50)}}>
                        update
              </Button>
              
              </TableCell>
              <TableCell align='left'>
              <IconButton align='left'
                      variant="contained" 
                      color='error' 
                      onClick={()=>dispatch(DeleteCountryAsync(country.id))}>
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
