import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import {Redirect} from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));


export default function Orders(props) {
  const classes = useStyles();
  console.log(props.data)
  const handleEdit = () => (
    <Redirect to="/dashboard/update" />
  )
  const handleDelete = () => {

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
              <TableCell>{website.location}</TableCell>
              <TableCell>{website.title}</TableCell>
              <TableCell><EditIcon onClick={handleEdit}/></TableCell>
              <TableCell><DeleteIcon onClick={handleDelete}/></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>  }
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" to="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}

