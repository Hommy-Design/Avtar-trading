import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import img from './bulkorder.png'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


const FloatBulkOrder = () => {

  // State to manage the form fields
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    mobileNumber: '',
    requirementDetail: '',
  });

  // State to manage the dialog open/close state
  const [open, setOpen] = useState(false);

  // Handler for opening the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handler for closing the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handler for form submission
  const handleSubmit = () => {
    // Handle form submission logic here
    // For example, you can send the form data to an API
    // and then close the dialog
    console.log('Form submitted:', formData);
    handleClose();
  };

  // Handler for updating form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  return (
    <div style={{ position: 'fixed', bottom: 50, right:60, zIndex:'65786576768686'}}>
      <Fab color="primary" aria-label="add" style={{width:'90px', height:'90px'}}>
      <Tooltip title="Bulk Order" placement="left" >
      <IconButton onClick={handleClickOpen}>
      {/* <ShoppingCartIcon style={{width:'50px', height:'50px', color:'white'}}/> */}
      <img src={img} alt="" style={{width:'91px', height:'91px',borderRadius:'50px' }} />
      </IconButton>
    </Tooltip>
      </Fab>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Bulk Order Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below:
          </DialogContentText>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Location"
            type="text"
            fullWidth
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Mobile Number"
            type="text"
            fullWidth
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Requirement Detail"
            type="text"
            fullWidth
            name="requirementDetail"
            value={formData.requirementDetail}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>


    </div>
  );
};

export default FloatBulkOrder;



