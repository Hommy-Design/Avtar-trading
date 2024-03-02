import { Box, Button, Checkbox, IconButton, ImageList, ImageListItem, Input, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Field, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../adminComponents/Header";
import { useEffect, useState } from "react";
import './popularproduct.css'
import { toast } from "react-toastify";

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch, useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { addpopularproduct, deletepopularproduct, getpopularproduct } from "../../redux/actions/popularproductAction";
import { popularproductdeleteReset } from "../../redux/slices/popularproductSlice";






const PopularProduct = () => {

    const dispatch = useDispatch();
    // const navigate = useNavigate()

    const { popularproduct, isDeleted } = useSelector((state) => state.popularproduct)

    let allproducts = popularproduct?.allproduct


    const isNonMobile = useMediaQuery("(min-width:600px)");

    let handleProductdelete = (id)=>{
        dispatch(deletepopularproduct(id))
    }


    useEffect(() => {

        dispatch(getpopularproduct())
        dispatch(popularproductdeleteReset())

        // dispatch(getproduct())
    }, [dispatch,isDeleted])



    return (
        <Box m="20px">
            <Header title="Popular Product" subtitle="Popular product" />
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Description</TableCell>
                         

                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allproducts?.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <img
                                        src={row?.product?.images[0]?.url}
                                        alt='img'
                                        loading="lazy"
                                        width={150}
                                        height={75}
                                    />
                                </TableCell>
                                <TableCell align="right">{row?.product?.name}</TableCell>
                                <TableCell align="right">{row?.product?.description}</TableCell>
                          

                                <TableCell align="right"><Button style={{ color: 'white' }} onClick={() => handleProductdelete(row._id)}><DeleteIcon /></Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>







        </Box>
    );
};




export default PopularProduct;
