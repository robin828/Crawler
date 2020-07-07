import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/Select';
import {Link} from 'react-router-dom'
import Axios from 'axios'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  sizes: {
    minWidth: "24.5rem"
  }
}));

const Publish = (props) => {
  const classes = useStyles();
  const [states, setStates] = useState([])
  const [city, setCity] = useState([])
  const publishWebsite = (e) => {
    e.preventDefault()
    fetch('http://3.7.205.75:8080/publish/website', {
    method: 'post',
    body: JSON.stringify({
        category: category,
        location: location,
        district: district,
        url: url,
        title: title,
        userId: props.local,
    }),
        
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json.status))
  
}
useEffect(()=>{
  const fetchState = async () => {
  
    const {data : {states}} = await Axios.get(`http://3.7.205.75:8080/states`); 
    setCity(states)       
  }
  fetchState()
  },[setCity])

const [district1, setDistrict1] = useState([])
const [category, setCategory] = useState('')
const [location, setLocation] = useState('')
const [district, setDistrict] = useState('')
const [url, setUrl] = useState('')
const [title, setTitle] = useState('')
console.log(location)
console.log(district)
const handleState = (e)=>{
  
  setLocation(e.target.value)
  city.map((cities) => {
      //console.log(cities.state)
      //console.log(cities)
      if(e.target.value===cities.state){
          setDistrict1(cities.districts)
      //console.log(district)
      //console.log("district")
      }
  })
}
const handleCategory = (e) => {
  setCategory(e.target.value)
}

const handleDistrict = (e) => {
  
  setDistrict(e.target.value)
}

const handleUrl = (e) => {
  setUrl(e.target.value)
}
const handleTitle = (e) => {
  setTitle(e.target.value)
}
    return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Publish Website
      </Typography>
      <form className={classes.form} onSubmit={publishWebsite}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="category"
              value={category}
              onChange={handleCategory}
              variant="outlined"
              required
              fullWidth
              id="category"
              label="Category"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="title"
              label="Title"
              type="text"
              id="title"
              value={title}
              onChange={handleTitle}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              value={url}
              onChange={handleUrl}
              required
              fullWidth
              name="url"
              label="Url"
              id="url"
            />
          </Grid>
          <Grid item xs={12}>
      <FormControl variant="outlined">
          <NativeSelect defaultValue="Select State" onChange={handleState}>
            <option value="Select State">Select State</option>
  {city.map((data, i)=> <option key={i} value={data.state}>{data.state}</option>)} 
          </NativeSelect>
      </FormControl>
      </Grid>
      <Grid item xs={12}>
      <FormControl variant="outlined">
          <NativeSelect defaultValue="Select Districts" onChange={handleDistrict}>
            <option value="Select Districts">Select Districts</option>
  {district1.map((data, i)=> <option key={i} value={data}>{data}</option>)} 
          </NativeSelect>
      </FormControl>
      </Grid>
          {/* <Grid item xs={12}>

          <FormControl variant="outlined" className={classes.formControl} onChange={handleLocation}>
          <NativeSelect value='Select State' onChange={handleState} className={classes.sizes}>
            <option value='Select State'>Select State</option>
              {city.map((city)=>(
              <option key={city.state} value={city.state}>{city.state}</option>
            ))}
          </NativeSelect>
      </FormControl>
      </Grid>
      <Grid item xs={12}>
      <FormControl variant="outlined" className={classes.formControl} onChange={handleDistrict}>
          <NativeSelect value='Select District' className={classes.sizes}>
            <option value='Select District'>Select District</option>
              {district1.map((dis)=>( 
              <value key={dis} value={dis} >{dis}</value>
            ))}
          </NativeSelect>
      </FormControl>
         
          {/* /* <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-Nativeselect-outlined-label">States</InputLabel>
        <NativeSelect
          labelId="demo-simple-Nativeselect-outlined-label"
          id="demo-simple-Nativeselect-outlined"
          value={location}
          onChange={handleLocation}
          label="States"
          className={classes.sizes}
        >         
         {city.map((city)=>(
              <MenuItem key={city.state} value={location}>{city.state}</MenuItem>
            ))}
        </NativeSelect>
      </FormControl>*/}
             
              
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Publish
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link to="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
        </Grid>
      </form>
    </div>
  </Container>
);

    }

export default Publish
