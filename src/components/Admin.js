import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import Modal from '@material-ui/core/Modal';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export default function Practics() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const [posts, setPosts] =useState([])
    const [pageNumber, setPageNumber] = useState() 
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1) 
    const [postsPerPage] = useState(10)
    const [userId, setUserId] = useState("")
    const handleChange = (event, value) => {
      setPage(value);
    }
    const handleReject = async (id) => {
      handleOpen()
      
      await Axios.patch("http://3.7.205.75:8080/approval", {
        'approvalStatus': "Reject",
        'id': id,
    })
    .then((response) => {
           console.log(response);
    });

    }
    const handleApproved = async (id) => {
      await Axios.patch("http://3.7.205.75:8080/approval", {
        'approvalStatus': "Approved",
        'id': id,
    })
    .then((response) => {
           console.log(response);
    });

    }

    useEffect(() => {
      const fetchWebsiteList = async () => {
        await Axios.get(`http://3.7.205.75:8080/pending?pageNumber=${page}&pageSize=10&sortBy=createdOn&sortOrder=DESC`)
        .then(res => {
          setPageNumber(res.data.page.total)
          setPosts(res.data.websites)
        });
      }
      fetchWebsiteList()
    },[page])
 
    
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const body = (
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Text in a modal</h2>
        <p id="simple-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p>
      </div>
    );

    return (
        <div className={classes.root}>
            <div className="text-right my-3">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            
            <table className="table my-3">
  <thead>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Title</th>
      <th scope="col">Body</th>
      <th scope="col">Accept</th>
      <th scope="col">Reject</th>
    </tr>
  </thead>
  <tbody>
  {currentPosts.map(post => (
    <tr key={post.id}>
      <th scope="row">{post.id}</th>
      <td>{post.category}</td>
      <td>{post.location}</td>
      <td><button onClick={()=>handleApproved(post.id)}>Accept</button></td>
      <td><button type="button" onClick={()=>handleReject(post.id)}>Reject</button></td>
    </tr>
    ))}
  </tbody>
</table> 

<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>

      <Pagination count={Math.floor(pageNumber/10)} page={page} onChange={handleChange} />
        </div>

    )
}

