import React from 'react'
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

const Testing = (props) => {
  const classes = useStyles();
  return (
    <>
     <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Publish Website
      </Typography>
      <form className={classes.form} onSubmit={props.publishWebsite}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="category"
              value={props.category}
              onChange={props.handleCategory}
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
              value={props.title}
              onChange={props.handleTitle}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              value={props.url}
              onChange={props.handleUrl}
              required
              fullWidth
              name="url"
              label="Url"
              id="url"
            />
          </Grid>
          <Grid item xs={12}>
      <FormControl variant="outlined">
          <NativeSelect defaultValue="Select State" onChange={props.handleState}>
            <option value="Select State">Select State</option>
  {props.city.map((data, i)=> <option key={i} value={data.state}>{data.state}</option>)} 
          </NativeSelect>
      </FormControl>
      </Grid>
      <Grid item xs={12}>
      <FormControl variant="outlined">
          <NativeSelect defaultValue="Select Districts" onChange={props.handleDistrict}>
            <option value="Select Districts">Select Districts</option>
  {props.district1.map((data, i)=> <option key={i} value={data}>{data}</option>)} 
          </NativeSelect>
      </FormControl>
      </Grid> 
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Publish
        </Button>
        </Grid>
      </form>
    </div>
  </Container> 
    </>
  )
}

export default Testing
