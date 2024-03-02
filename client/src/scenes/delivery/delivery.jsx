import { Box, Button, Checkbox, IconButton, ImageList, ImageListItem, Input, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../adminComponents/Header";
import { useEffect, useState } from "react";
import './delivery.css'
import { toast } from "react-toastify";

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

import { useDispatch, useSelector } from 'react-redux'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import { adddelivery, deletedelivery, getdelivery } from "../../redux/actions/deliveryAction";
import { deliverydeleteReset, deliveryuploadReset } from "../../redux/slices/deliverySlice";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));



const Delivery = () => {

    const dispatch = useDispatch();
    // const navigate = useNavigate()

    const { delivery, isDeleted, isUploaded } = useSelector((state) => state.delivery)

    console.log(delivery);


    const [open, setOpen] = useState(false);
    const [name, setName] = useState('')

    const [pincode, setPincode] = useState('')
    const [distance, setDistance] = useState('')


    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleSubmit = (e) => {

        e.preventDefault();

        setOpen(false);

        const myForm = new FormData();

        myForm.append('name', name)
        myForm.append('pincode', pincode)
        myForm.append('distance', distance)


        dispatch(adddelivery(myForm))
        // console.log(Object.fromEntries(myForm));


    }

    let handleDeliverydelete = (id) => {
        dispatch(deletedelivery(id));

    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };





    useEffect(() => {



        dispatch(getdelivery())
        dispatch(deliverydeleteReset())
        dispatch(deliveryuploadReset())
        // dispatch(getproduct())
    }, [dispatch,isDeleted,isUploaded])



    return (
        <Box m="20px">
            <Header title="Manage Adresses" subtitle="Manage Adresses" />

            <Box display="flex" justifyContent="end" mt="20px">

                <Button color="secondary" variant="contained" onClick={handleClickOpen}>
                    Add Adress
                </Button>
            </Box>


            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Add Product
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>

                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div onKeyDown={e => e.stopPropagation()}
                        >
                            <TextField
                                required
                                id="standard-basic"
                                variant="standard"
                                label="Area Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Area Name"
                            />
                            <TextField
                                required
                                id="standard-basic"
                                variant="standard"
                                label="Distance from 110077 in km"
                                name="distance"
                                type="number"
                                value={distance}
                                onChange={(e) => setDistance(e.target.value)}
                                placeholder="Distance from 110077 in km"
                            />

                            <TextField
                                required
                                id="standard-basic"
                                variant="standard"
                                label="Pin Code"
                                type="number"
                                name="pincode"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                placeholder="Pin Code"
                            />


                        </div>
                    </Box>


                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSubmit} color="secondary" variant="contained" >
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>


            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Area Name</TableCell>
                            <TableCell align="right">Pincode</TableCell>
                            <TableCell align="right">Distance</TableCell>

                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {delivery?.map((item, index) => (
                            <TableRow
                            key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell >{item.name}</TableCell>
                                <TableCell align="right">{item.distance}</TableCell>
                                <TableCell align="right">{item.pincode}</TableCell>


                                <TableCell align="right"><Button style={{ color: 'white' }} onClick={() => handleDeliverydelete(item._id)}><DeleteIcon /></Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </Box>
    );
};




export default Delivery;
