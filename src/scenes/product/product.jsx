import { Box, Button, Checkbox, IconButton, ImageList, ImageListItem, Input, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Field, Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../adminComponents/Header";
import { useEffect, useState } from "react";
import './product.css'
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
import Select from '@mui/material/Select';
import { addProduct, deletedProduct, getAdminProduct } from "../../redux/actions/productAction";
import { getcategory } from "../../redux/actions/categoryAction";
import { getsubcategory } from "../../redux/actions/subcategoryAction";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { addpopularproduct } from "../../redux/actions/popularproductAction";
import { productdeleteReset } from "../../redux/slices/productSlice";

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

    const { product, isUploaded, isLoading , isDeleted} = useSelector((state) => state.product)
    const { category: categories } = useSelector((state) => state.category)
    const { subcategory } = useSelector((state) => state.subcategory)


    const [imagePreview, setImagePreview] = useState([])
    const [images, setImages] = useState([])
    const [open, setOpen] = useState(false);
    const [openedit, setOpenedit] = useState(false);
    const [name, setName] = useState('')

    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [shortdesc, setShortdesc] = useState('')
    const [weight, setWeight] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [scategory, setScategory] = useState('')
    const [formFields, setFormFields] = useState([{ name: '', price: '', pic: '' }]); // Initial state with an empty field



    console.log(subcategory);


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

        myForm.append('name', name)
        myForm.append('price', price)
        myForm.append('description', description)
        myForm.append('category', category)
        myForm.append('subcategory', scategory)
        myForm.append('shortdesc', shortdesc)
        myForm.append('weight', weight)
        myForm.append('discount', discount)
        myForm.append('stripes', JSON.stringify(formFields))
        images.forEach((image) => {
            myForm.append('images', image)
        })


        dispatch(addProduct(myForm))
        // console.log(Object.fromEntries(myForm));


    }

    let handleProductdelete = (id) => {
        dispatch(deletedProduct(id));

    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseedit = () => {
        setOpenedit(false);
    };

    const handleClickOpenedit = (id) => {
        setOpenedit(true);

        // dispatch(getproductDetail(id))

    };

    const handleSubmitedit = () => {
        console.log('uggjjj');
    }


    let handleChange = (e) => {
        console.log(e.target.value);
    }



    const addFormField = () => {
        setFormFields([...formFields, { name: '', price: '', pic: '' }]);
    };

    const removeFormField = (index) => {
        const updatedFields = [...formFields];
        updatedFields.splice(index, 1);
        setFormFields(updatedFields);
    };
    const convertImageToBase64 = (file) => {
        console.log(file);
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };





    const handleFieldChange = async (index, field, value) => {
        const newFormFields = [...formFields];
        if (field === 'pic' && value) {
            // Convert uploaded image to base64
            const file = value[0];
            const base64 = await convertImageToBase64(file);
            newFormFields[index][field] = base64;
        } else {
            newFormFields[index][field] = value;
        }
        setFormFields(newFormFields);
    };

    let handleaddPopularProduct = (id) => {
        console.log(id);

        dispatch(addpopularproduct(id))
    }



    console.log(category);

    useEffect(() => {


        if (category) {
            dispatch(getsubcategory(category))
        }

        // if (isDeleted) {
        //     toast.success("Product Deleted successfully", { position: "top-right" })

        //     // dispatch(bannerdeleteReset())
        // }
        // if (productDetail) {
        //     setName(productDetail?.name);
        //     setDescription(productDetail?.description);
        //     setLocation(productDetail?.location);
        //     setBathroom(productDetail?.bathroom);
        //     setSize(productDetail?.size);
        //     setBedroom(productDetail?.bedroom);
        //     setPrice(productDetail?.price);
        //     setImages(productDetail?.image?.url)
        // }

        dispatch(getAdminProduct())
        dispatch(getcategory())
        dispatch(productdeleteReset())
        // dispatch(getproduct())
    }, [dispatch, category,isDeleted])



    return (
        <Box m="20px">
            <Header title="Manage Product" subtitle="Manage product" />

            <Box display="flex" justifyContent="end" mt="20px">

                <Button color="secondary" variant="contained" onClick={handleClickOpen}>
                    Add Product
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
                                label="Product Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Product Name"
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
                            <TextField
                                required
                                id="standard-basic"
                                variant="standard"
                                label="Short Description"
                                name="shortdesc"
                                value={shortdesc}
                                onChange={(e) => setShortdesc(e.target.value)}
                                placeholder="Short Description"
                            />

                            {category === '65882b96880745b6741e2869'? <></>:<>
                            <TextField
                                required
                                id="standard-basic"
                                variant="standard"
                                label="Price"
                                type="number"
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Price"
                            /></>}


                            <TextField
                                required
                                id="standard-basic"
                                variant="standard"
                                label="Weight"
                                type="number"
                                name="weight"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder="Weight"
                            />
                            <TextField
                                required
                                id="standard-basic"
                                variant="standard"
                                label="Discount"
                                type="number"
                                name="discount"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                placeholder="Discount"
                            />


                            <>
                                <FormControl fullWidth style={{ marginTop: '10px' }}>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={category}
                                        label="Category"
                                        onChange={(e) => setCategory(e.target.value)}
                                    >

                                        {categories?.map((cat, ind) => (
                                            <MenuItem key={ind} value={cat?._id}>{cat?.name}</MenuItem>

                                        ))}


                                    </Select>

                                </FormControl>
                                <FormControl fullWidth style={{ marginTop: '10px' }} >
                                    <InputLabel id="demo-simple-select-label">Sub-Category</InputLabel>
                                    {category ? <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={scategory}
                                        label="Sub-Category"
                                        onChange={(e) => setScategory(e.target.value)}
                                    >
                                        {subcategory?.map((cat, ind) => (
                                            <MenuItem key={ind} value={cat?._id}>{cat?.name}</MenuItem>
                                        ))}

                                    </Select> : <><Input id="demo-simple-select" value='First Choose The Category' /></>}

                                </FormControl>

                                {category === '65882b96880745b6741e2869' ? <>  <form className="dynamic-form" >
                                    {formFields.map((field, index) => (
                                        <div key={index} className="form-field">
                                            <label>
                                                <TextField style={{ width: '100%' }} id="standard-basic" label="Stripe Name" variant="standard" value={field.name} name="name" onChange={(e) => handleFieldChange(index, 'name', e.target.value)} />


                                            </label>

                                            <label>
                                                <TextField style={{ width: '100%' }} id="standard-basic" label="Stripe Price" type="number" variant="standard" value={field.price} name="price" onChange={(e) => handleFieldChange(index, 'price', e.target.value)} />

                                            </label>

                                            <label className="file-label">
                                                <p>STRIPE IMAGE:</p>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    name="pic"
                                                    onChange={(e) => handleFieldChange(index, 'pic', e.target.files)}
                                                    // onChange={handleFileChange}
                                                    required
                                                />
                                            </label>
                                            <button type="button" onClick={() => removeFormField(index)} className="dynamic-button" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button style={{ display: 'flex', float: 'right', marginBottom: '1rem' }} type="button" onClick={addFormField} className="dynamic-button add-button">
                                        Add Field
                                    </button>

                                </form></> : <></>}

                            </>

                        </div>
                    </Box>



                    <Button style={{ marginTop: '2rem' }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload Product Images
                        <VisuallyHiddenInput type="file" accept="image/*" multiple name="file" onChange={ProductImageChange} />

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
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Short Desc</TableCell>
                            <TableCell align="right">Weight</TableCell>
                            <TableCell align="right">Category</TableCell>
                            <TableCell align="right">Sub-Category</TableCell>
                            <TableCell align="right">Price</TableCell>

                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                            <TableCell align="right">Add ro PopularProduct</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {product.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <img
                                        src={row?.images[0]?.url}
                                        alt='img'
                                        loading="lazy"
                                        width={150}
                                        height={75}
                                    />
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row?.description}</TableCell>
                                <TableCell align="right">{row?.shortdesc}</TableCell>
                                <TableCell align="right">{row?.weight}</TableCell>
                                <TableCell align="right">{row?.category?.name}</TableCell>
                                <TableCell align="right">{row?.subcategory?.name}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>

                                <TableCell align="right"><Button style={{ color: 'white' }} onClick={() => handleClickOpenedit(row._id)} ><EditIcon /></Button></TableCell>
                                <TableCell align="right"><Button style={{ color: 'white' }} onClick={() => handleProductdelete(row._id)}><DeleteIcon /></Button></TableCell>
                                <TableCell align="right"><Button style={{ color: 'white' }} onClick={() => handleaddPopularProduct(row._id)}><AddCircleOutlineIcon /></Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>




            {/* <BootstrapDialog
                onClose={handleCloseedit}
                aria-labelledby="customized-dialog-title"
                open={openedit}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Add Product
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseedit}
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
                        <div>
                            <TextField
                                required
                                id="outlined-required"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Product Name"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                name="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Location"
                            />

                            <TextField
                                required
                                id="outlined-required"
                                type="Number"
                                name="bathroom"
                                value={bathroom}
                                onChange={(e) => setBathroom(e.target.value)}
                                placeholder="Number of Bathroom"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                type="Number"
                                name="size"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                placeholder="Size"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                type="Number"
                                name="bedroom"
                                value={bedroom}
                                onChange={(e) => setBedroom(e.target.value)}
                                placeholder="Number of Bedrooms"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                type="Number"
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Price"
                            />
                        </div>
                    </Box>



                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload Product Image
                        <VisuallyHiddenInput type="file" name="file" onChange={BannerImageChange} />

                    </Button>

                    <div id="BannerImage">
                        {imagePreview.map((image, index) => (
                            <img src={image} key={index} alt='Avatar Preview' />
                        ))}

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSubmitedit} color="secondary" variant="contained" >
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog> */}





        </Box>
    );
};




export default HomeBanner;
