import { Box, Button, Checkbox, IconButton, ImageList, ImageListItem, Input, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Field, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../adminComponents/Header";
import { useEffect, useState } from "react";
import './offer.css'
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

import { addoffer, deleteoffer, getoffers } from "../../redux/actions/offerAction";
import { offerdeleteReset, offeruploadReset } from "../../redux/slices/offerSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));



const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


const Offer = () => {

    const dispatch = useDispatch();
    // const navigate = useNavigate()

    const { offer, isUploaded, isDeleted} = useSelector((state) => state.offer)

    const [imagePreview, setImagePreview] = useState([])
    const [images, setImages] = useState([])
    const [open, setOpen] = useState(false);
    const [openedit, setOpenedit] = useState(false);
    const [name, setName] = useState('')

    const [description, setDescription] = useState('')




    const isNonMobile = useMediaQuery("(min-width:600px)");

    const ProductImageChange = (e) => {

        const files = Array.from(e.target.files)
        // console.log(files);

        setImages([]);
        setImagePreview([])

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview((old) => [...old, reader.result])
                    setImages((old) => [...old, reader.result])
                }
            }

            reader.readAsDataURL(file);

        })


    }

    const handleSubmit = (e) => {

        e.preventDefault();

        setOpen(false);

        const myForm = new FormData();

        myForm.append('title', name)
        myForm.append('description', description)
        myForm.append('file', images)
      


        dispatch(addoffer(myForm))
        // console.log(Object.fromEntries(myForm));


    }

    let handleProductdelete = (id) => {
        dispatch(deleteoffer(id));

    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    useEffect(() => {



        dispatch(getoffers())
        dispatch(offeruploadReset())
        dispatch(offerdeleteReset())
        // dispatch(getproduct())
    }, [dispatch, isUploaded, isDeleted])



    return (
        <Box m="20px">
            <Header title="Manage Product" subtitle="Manage product" />

            <Box display="flex" justifyContent="end" mt="20px">

                <Button color="secondary" variant="contained" onClick={handleClickOpen}>
                    Add Offer
                </Button>
            </Box>




            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Add Offer
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
                                label="Offer Title"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Offer Title"
                            />
                            <TextField
                                required
                                id="standard-basic"
                                variant="standard"
                                label="Description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                            />

                          

                        </div>
                    </Box>



                    <Button style={{ marginTop: '2rem' }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload Offer Image
                        <VisuallyHiddenInput type="file" accept="image/*" name="file" onChange={ProductImageChange} />

                    </Button>

                    <div id="BannerImage">

                        {imagePreview.map((image, index) => (
                            <img src={image} key={index} width={200} height={200} alt='Avatar Preview' />
                        ))}
                    </div>
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
                            <TableCell>Product</TableCell>
                            <TableCell align="right">title</TableCell>
                            <TableCell align="right">Description</TableCell>
                     

                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {offer?.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <img
                                        src={row?.offerimage?.url}
                                        alt='img'
                                        loading="lazy"
                                        width={150}
                                        height={75}
                                    />
                                </TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                             

                           
                                <TableCell align="right"><Button style={{ color: 'white' }} onClick={() => handleProductdelete(row._id)}><DeleteIcon /></Button></TableCell>
                             
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>






        </Box>
    );
};




export default Offer;
