import { Box, Button, Checkbox, IconButton, ImageList, ImageListItem, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Field, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../adminComponents/Header";
import { useEffect, useState } from "react";
import './homeBanner.css'
import { toast } from "react-toastify";

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { addbanner, deletebanner, getbanner } from "../../redux/actions/homeBannerAction";
import {useDispatch, useSelector} from 'react-redux'
import { bannerdeleteReset } from "../../redux/slices/homeBannerSlice";

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


const HomeBanner = () => {

    const dispatch = useDispatch();
    // const navigate = useNavigate()

    const {isLoading, error, banner, isDeleted, isUploaded} = useSelector((state)=>state.banner)

    const [imagePreview, setImagePreview] = useState([])
    const [images, setImages] = useState([])
    const [open, setOpen] = useState(false);



    const isNonMobile = useMediaQuery("(min-width:600px)");

    const BannerImageChange = (e) => {

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

        const imgForm = new FormData();

        imgForm.append('file', images)

        dispatch(addbanner(imgForm))


        // console.log(Object.fromEntries(imgForm));


    }

    let handleDelete = (id) => {
       dispatch(deletebanner(id));

    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    useEffect(()=>{

        if(isUploaded){
            toast.success("Banner Uploaded successfully", {position: "top-right"})

            dispatch(getbanner())
        }

        if(isDeleted){
            toast.success("Banner Deleted successfully", {position: "top-right"})

            dispatch(bannerdeleteReset())
        }


        dispatch(getbanner())
    },[dispatch, isDeleted, isUploaded])



    return (
        <Box m="20px">
            <Header title="HOME BANNER" subtitle="Change Home Banner" />

            <Box display="flex" justifyContent="end" mt="20px">

                <Button color="secondary" variant="contained" onClick={handleClickOpen}>
                    Add Banner
                </Button>
            </Box>




            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Add Banner
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


                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput type="file" name="file" onChange={BannerImageChange} />

                    </Button>

                    <div id="BannerImage">

                        {imagePreview.map((image, index) => (
                            <img src={image} key={index} alt='Avatar Preview' />
                        ))}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSubmit} color="secondary" variant="contained" >
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>


            <List sx={{ width: '100%', height: '100px' }}>
               {banner?.map((data, index)=>(
                  <ListItem key={index}
                  >
                      <div style={{ justifyContent: 'flex-start' }} >
                          <img
                              src={data?.image?.url}
                              alt='img'
                              loading="lazy"
                              width={400}
                              height={200}
                          />
                      </div>
                      <ListItemButton onClick={()=>handleDelete(data._id)} style={{ justifyContent: 'flex-end', width: '10px' }} >
  
                          <DeleteIcon />
                      </ListItemButton>
                  </ListItem>
               ))}


            </List>






        </Box>
    );
};




export default HomeBanner;
