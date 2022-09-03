import React from 'react'

// material ui
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';

// redux
import {useSelector, useDispatch} from "react-redux";
import {DeleteCountryAsync, GetOneCountryAsync} from '../redux/Countries/CountriesSlice'
import {SelectSuper} from '../redux/Login/LoginSlice'

// router
import { useNavigate } from "react-router-dom";



export default function CountriesCards({all_countries}) {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const is_super = useSelector(SelectSuper)

  return (
    <div>
      <Grid container spacing={2} >
      {all_countries.map((country, ind) => (
        <Grid item xs={4} key={ind}>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="20"
        image={`http://127.0.0.1:8000/static/images/${country.flag}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {country.name}
        </Typography>
      </CardContent>
    {is_super&&
      <CardActions>
      <Button align='left'
                      variant="contained"
                      sx={{color:'white', background:'#5B5EA6'}}
                      onClick={()=>{dispatch(GetOneCountryAsync(country.id));
                                    setTimeout(() => navigate(`/UpdateCountry`), 50)}}>
                        update
              </Button>
              <IconButton align='left'
                      variant="contained" 
                      color='error' 
                      onClick={()=>dispatch(DeleteCountryAsync(country.id))}>
                        <DeleteIcon />
              </IconButton>
      </CardActions>
   }  
    </Card>
    </Grid>
    ))}
  </Grid>
  </div>
  );
}