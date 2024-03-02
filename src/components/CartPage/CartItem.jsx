import React, { useState } from 'react';
import { TableCell, TableRow, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({ item, onQuantityChange, onRemoveItem }) => {
  const [quantity, setQuantity] = useState(1)
  const handleQuantityInputChange = (event) => {
    onQuantityChange(item._id, event.target.value);
  };

  return (
    <TableRow>
      <TableCell>
        <img src={item.images[0].url} alt={item.name} style={{ width: '100px', height: '50px' }} />
      </TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>${item.price}</TableCell>
      <TableCell>${item?.weight}</TableCell>
      <TableCell>
        <TextField
          type="number"
          value={quantity}
          // onChange={handleQuantityInputChange}
          onChange={(e)=>setQuantity(e.target.value)}
          inputProps={{ min: 1 }}
          style={{width:'4rem'}}
        />
      </TableCell>
      <TableCell>${(item?.price * quantity )}</TableCell>
      <TableCell>{(item?.weight * quantity )} KG</TableCell>
      <TableCell>
        <IconButton color="secondary" onClick={() => onRemoveItem(item._id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
