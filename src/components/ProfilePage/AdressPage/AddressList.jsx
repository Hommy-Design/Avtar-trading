// AddressList.js
import React, { useEffect } from 'react';
import { List, ListItem, ListItemText, Button, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getaddress, deleteaddress } from '../../../redux/actions/addressAction';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addressrdeleteReset, addressruploadReset } from '../../../redux/slices/addressSlice';

const AddressList = () => {
  let dispatch = useDispatch()

  const { address, isDeleted,isUploaded } = useSelector((state) => state.address)


  let onDelete = (id) => {
    dispatch(deleteaddress(id))
  }

  useEffect(() => {
    dispatch(getaddress())
    dispatch(addressrdeleteReset())
    dispatch(addressruploadReset())

  }, [dispatch, isDeleted,isUploaded])

  return (
    <>
      {address.map((address, index) => (
        <Paper elevation={1} style={{ padding: '20px', margin: '20px' }}>
          <List>

            <ListItem key={index}>
              <ListItemText
                primary={`${address.name} - ${address.address}, ${address.area}, ${address.pincode}`}
                secondary={`Phone: ${address.phone}`}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '5px' }}
              // className={classes.button}
              // onClick={() => onEdit(address.id)}
              >
                <EditIcon />
              </Button>
              <Button
                variant="contained"
                color="secondary"
                // className={classes.button}
                onClick={() => onDelete(address._id)}
              >
                <DeleteIcon />
              </Button>
            </ListItem>

          </List>
        </Paper>
      ))}
    </>
  );
};

export default AddressList;
