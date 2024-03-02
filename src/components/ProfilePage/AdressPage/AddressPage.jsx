// MainComponent.js
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import AddressList from './AddressList';
import AddAddressForm from './AddAdressForm';
import { useDispatch, useSelector } from 'react-redux';
import { getaddress } from '../../../redux/actions/addressAction';

const AddressPage = () => {



  const [isAddAddressFormOpen, setAddAddressFormOpen] = useState(false);

 

  return (
    <div>
      <Button onClick={() => setAddAddressFormOpen(true)} variant="contained" color="primary" style={{backgroundColor:'blue', display:'flex', justifyContent:'flex-end', marginLeft:'auto'}}>
        Add Address
      </Button>
      <div style={{ maxHeight: '550px', overflowY: 'auto', marginTop: '16px' }}>

      <AddressList />
      </div>

      <AddAddressForm
        open={isAddAddressFormOpen}
        onClose={() => setAddAddressFormOpen(false)}
      />
    </div>
  );
};

export default AddressPage;
