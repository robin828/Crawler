import React, {useState, useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Testing from '../components/Testing'
import Login from '../components/Login'
import {Redirect} from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Axios from 'axios'
import Button from '@material-ui/core/Button';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export default function Orders(props) {
  const classes = useStyles();
  const [editId, setEditId] = useState("")    // To transfer userId to updateWebsite
  const [open, setOpen] = React.useState(false); // To check Modal Activity
  const [district1, setDistrict1] = useState([])
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [district, setDistrict] = useState('')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [city, setCity] = useState([])

  // Main Edit put request
  const updateWebsite = (e) => {
    e.preventDefault()
    console.log(editId)
    fetch(`http://3.7.205.75:8080/publish/website/${editId}`, {
    method: 'put',
    body: JSON.stringify({
        category: category,
        location: location,
        district: district,
        url: url,
        title: title,
        userId: sessionStorage.getItem('userId'),
        id: editId,
    }),   
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json.status))
}


  // Main Delete request
  const handleDelete = (id) => {
    const editId = [id]
    Axios.delete("http://3.7.205.75:8080/publish/website", {
      data: {
        ids: editId
      }
    }).then(res => console.log(res));
    console.log(id)
  }

  // when we click edit button in picture
  const handleEdit = (id)=>{
    handleOpen()
    setEditId(id)
  }

  //set Modal open
  const handleOpen = () => {
    setOpen(true);
  };

  //set Modal close
  const handleClose = () => {
    setOpen(false);
  };

  // Fetching States
  useEffect(()=>{
    const fetchState = async () => {
    
      const {data : {states}} = await Axios.get(`http://3.7.205.75:8080/states`); 
      setCity(states)       
    }
    fetchState()
    },[setCity])

    // Fetching District regarding the required state
const handleState = (e)=>{
  setLocation(e.target.value)
  city.map((cities) => {
      if(e.target.value===cities.state){
          setDistrict1(cities.districts)
      }
  })
}
 // Handle update page
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
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Url</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Title</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        {  <TableBody>
          {props.data.websites.map((website) => (
            <TableRow key={website.url}>
              <TableCell>{website.category}</TableCell>
              <TableCell>{website.url}</TableCell>
              <TableCell>{website.location}</TableCell>
              <TableCell>{website.status}</TableCell>
              <TableCell>{website.title}</TableCell>
              <TableCell><Button><EditIcon onClick={()=>handleEdit(website.id)}/></Button></TableCell>
              <TableCell><Button><DeleteIcon onClick={()=>handleDelete(website.id)}/></Button></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>  }
      </Table>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Update Website</h2>
            <Testing 
                publishWebsite={updateWebsite}
                handleTitle={handleTitle}
                handleUrl={handleUrl}
                handleDistrict={handleDistrict}
                handleCategory={handleCategory}
                handleState={handleState}
                district1={district1}
                category={category}
                location={location}
                district={district}
                url={url}
                title={title}
                city={city}
                local={props.local}
            />
          </div>
        </Fade>
      </Modal>
      <div className={classes.seeMore}>
        <Link color="primary" to="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}

