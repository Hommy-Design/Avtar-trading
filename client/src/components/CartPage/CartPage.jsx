


// <div className="wrapper">
//     <div className="flexColStart paddings innerWidth property-container" >  


import React, { useEffect, useState } from 'react';
import { Button, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import CartItem from './CartItem';
import img2 from '/1.jpg'
import img3 from '/4.jpg'
import img4 from '/6.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { getmycart, removeItemsfromCart } from '../../redux/actions/cartActions';
import { cartrdeleteReset } from '../../redux/slices/cartSlice';
import { getaddress } from '../../redux/actions/addressAction';
import { getdelivery } from '../../redux/actions/deliveryAction';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', image: img2, price: 25.99, quantity: 2 },
    { id: 2, name: 'Product 2', image: img3, price: 19.99, quantity: 1 },
    // Add more items as needed
  ]);

  const [pincode, setPincode] = useState('')

  let dispatch = useDispatch()
  const { cart, isDeleted } = useSelector((state) => state.cart)
  const { address } = useSelector((state) => state.address)
  const { delivery } = useSelector((state) => state.delivery)

  let prod = cart?.cart?.products;



  const [selectedAddress, setSelectedAddress] = useState('');


  let deliveryadd = delivery?.filter((item) => item?.pincode === selectedAddress?.pincode)
  // console.log(deliveryadd[0]?.distance);

  let totalweight = 0;
  let anotherproduct = [];
  prod?.map((item) => {
    totalweight = totalweight + item?.product?.weight
    if (!(item?.product?.category === '65882b96880745b6741e2869')) {
      anotherproduct.push(item)
    }
  })

  let additionalshipping = 0;
  let anotherprodprice = 0;
  anotherproduct?.map((item) => {
    anotherprodprice = anotherprodprice + item?.product?.price
  })

  // console.log(anotherprodprice);

  if(anotherprodprice>0){
    if (anotherprodprice * 0.03 > 500) {
      additionalshipping = anotherprodprice * 0.03;
    } else {
      additionalshipping = 500;
    }
  }




  console.log(additionalshipping);


  // console.log(parseFloat(Totalweight()).toFixed(2));

  let shippingPrice;

  if (deliveryadd[0]?.distance < 10 && totalweight <= 1000) {
    shippingPrice = 700;
  } else if (deliveryadd[0]?.distance < 10 && totalweight > 1000 && totalweight <= 2000) {
    shippingPrice = 1000;

  } else if (deliveryadd[0]?.distance < 10 && totalweight > 2000 && totalweight <= 3000) {
    shippingPrice = 1500;

  }

  else if (deliveryadd[0]?.distance > 10 && deliveryadd[0]?.distance < 20 && totalweight <= 1000) {
    shippingPrice = 1000;
  }
  else if (deliveryadd[0]?.distance > 10 && deliveryadd[0]?.distance < 20 && totalweight > 1000 && totalweight <= 2000) {
    shippingPrice = 1500;
  }
  else if (deliveryadd[0]?.distance > 10 && deliveryadd[0]?.distance < 20 && totalweight > 2000 && totalweight <= 3000) {
    shippingPrice = 2000;


  } else if (deliveryadd[0]?.distance > 20 && deliveryadd[0]?.distance < 30 && totalweight <= 3000) {
    shippingPrice = 2500;

  }
  else if (deliveryadd[0]?.distance > 30 && deliveryadd[0]?.distance < 40 && totalweight <= 1000) {
    shippingPrice = 1500;

  }
  else if (deliveryadd[0]?.distance > 30 && deliveryadd[0]?.distance < 40 && totalweight > 1000 && totalweight <= 2000) {
    shippingPrice = 2500;

  }
  else if (deliveryadd[0]?.distance > 30 && deliveryadd[0]?.distance < 40 && totalweight > 2000 && totalweight <= 3000) {
    shippingPrice = 3000;

  }
  else if (deliveryadd[0]?.distance > 40 && deliveryadd[0]?.distance < 50) {
    shippingPrice = 4000;

  }
  else if (deliveryadd[0]?.distance > 50) {
    shippingPrice = 5000;

  }

  let checkout =()=>{
    console.log(cart?.cart?.products);
  }



  const calculateTotal = () => {
    // console.log(prod);
    return prod?.reduce((total, item) => total + item?.product?.price, 0);
  };


  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: parseInt(newQuantity, 10) || 0 } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemsfromCart(id))
  };





  useEffect(() => {
    dispatch(getdelivery())
    dispatch(getaddress())
    dispatch(getmycart())
    dispatch(cartrdeleteReset())
  }, [dispatch, isDeleted])



  return (

    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container" >
       {prod?.length>0?<> <Grid container spacing={2} style={{ height: '70vh' }}>
          <Grid item xs={8}>
            <div>
              <Box p={2} borderBottom={1} borderColor="primary.main">
                <Typography variant="h6" gutterBottom>
                  Your Cart
                </Typography>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>weight</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Total Price</TableCell>
                      <TableCell>Total Weight</TableCell>
                      <TableCell>Remove</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {prod?.map((item) => (
                      <CartItem
                        key={item?.product._id}
                        item={item?.product}
                        onQuantityChange={handleQuantityChange}
                        onRemoveItem={handleRemoveItem}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
          <Grid item xs={4}>
            <Paper style={{ height: '300px' }}>
              <Box p={2} borderBottom={1} borderColor="primary.main">
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
              </Box>
              <Box p={2}>



                <Typography variant="body1" gutterBottom>
                  Delivery Address:
                </Typography>
                <FormControl style={{ marginBottom: '1rem' }} fullWidth>
                  <InputLabel id="demo-simple-select-label">Addresses</InputLabel>
                  <Select
                    value={selectedAddress}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                    style={{ marginBottom: '16px' }}
                    label="Adresses"
                  >
                    {address.map((item, index) => (
                      <MenuItem key={index} value={item} >
                        {item.name} - {item.area}, {item.pincode},(Phone:- {item.phone})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>





                <Typography variant="body1" gutterBottom>
                  Subtotal: ₹{calculateTotal()}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Shipping: ₹{shippingPrice + additionalshipping}
                </Typography>
                <Typography variant="h6" gutterBottom style={{ color: 'blue' }}>
                  Total: ₹{(parseFloat(calculateTotal()) + shippingPrice + additionalshipping).toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" onClick={checkout}>
          Checkout
        </Button></>:<><div style={{height:'100vh',width:'100%', display:'flex', alignItems:'center', justifyContent:'center', color:'red', fontSize:'5rem'}}>NO ITEMS IN CART</div></>}
      </div>
    </div>

  );
};

export default CartPage;
