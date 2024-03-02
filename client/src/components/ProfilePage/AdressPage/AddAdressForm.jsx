// AddAddressForm.js
import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addaddress } from '../../../redux/actions/addressAction';
import { getdelivery } from '../../../redux/actions/deliveryAction';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AddAddressForm = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');

  let dispatch = useDispatch()
  const { delivery } = useSelector((state) => state.delivery)

  console.log(delivery);


  const handleChange = (event) => {
    setPincode(event.target.value);
    let areaa = delivery?.filter((item) => item.pincode === event.target.value)
    console.log(areaa);
    setArea(areaa[0]?.name)
  };

  console.log(area);


  const handleSubmit = () => {
    // Validation logic can be added here

    let addform = new FormData();

    addform.append('name', name);
    addform.append('phone', phoneNumber);
    addform.append('pincode', pincode);
    addform.append('address', address);
    addform.append('area', area);

    dispatch(addaddress(addform))

    onClose();
  };


  useEffect(() => {
    dispatch(getdelivery())
  }, [dispatch])

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Address</DialogTitle>
      <DialogContent>
        <TextField style={{ marginBottom: '1rem' }}
          label="Name" name='name' value={name} onChange={(e) => setName(e.target.value)} fullWidth />
        <TextField
          style={{ marginBottom: '1rem' }}
          label="Phone Number"
          type='number'
          name='phone'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
        />


        <FormControl style={{marginBottom:'1rem'}} fullWidth>
          <InputLabel id="demo-simple-select-label">PinCode</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={pincode}
            label="pincode"
            onChange={handleChange}
          >
            {delivery?.map((item, index) => (
              <MenuItem key={index} value={item?.pincode}>{item?.pincode}</MenuItem>

            ))}

          </Select>
        </FormControl>

        <TextField style={{marginBottom:'1rem'}} label="Area Name" name='area' value={area} fullWidth />





        <TextField style={{marginBottom:'1rem'}} label="Address" name='address' value={address} onChange={(e) => setAddress(e.target.value)} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAddressForm;
