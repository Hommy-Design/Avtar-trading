import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { AiFillHeart } from "react-icons/ai";
import "./ProductDetail2.css";

import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import Map from "../Map/Map.jsx";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import Heart from "../Heart/Heart.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../redux/actions/productAction.js";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Grid } from "@mui/material";
import { Shower, DriveEta, MeetingRoom, AddShoppingCart } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
    Container,
    Typography,
    Paper,
    IconButton,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import defaultimg from '/2.jpg'
import img2 from '/1.jpg'
import img3 from '/4.jpg'
import img4 from '/6.jpg'
import Residencies from "../Residencies/Residencies.jsx";
import { addItemsToCart } from "../../redux/actions/cartActions.js";





const ProductDetail2 = () => {

    let dispatch = useDispatch()
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);



    const { id } = useParams();

    const [modalOpened, setModalOpened] = useState(false);
    const { productDetail } = useSelector((state) => state.product)

    console.log(productDetail);
    const [cart, setCart] = useState([]);
    const [selectedColor, setSelectedColor] = useState(''); // State to track selected color
    const [isHovered, setIsHovered] = useState(false);
    const [img, setImg] = useState('');


    const handleMouseOver = () => {
        setIsHovered(true);
        setImg(img2)
    };
    const handleMouseOver1 = () => {
        setIsHovered(true);
        setImg(img3)
    };
    const handleMouseOver2 = () => {
        setIsHovered(true);
        setImg(img4)
    };
    const handleMouseOver3 = () => {
        setIsHovered(true);
        setImg(img2)
    };

    const handleMouseOut = () => {
        setIsHovered(false);
    };




    const handleClose = () => {
        setOpen(false);
    };



    const addToCart = (id) => {
        dispatch(addItemsToCart({ 'productId': id }))
        setOpen(true);

    };



    let isLoading = false;
    let isError = false;

    if (isLoading) {
        return (
            <div className="wrapper">
                <div className="flexCenter paddings">
                    <PuffLoader />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="wrapper">
                <div className="flexCenter paddings">
                    <span>Error while fetching the property details</span>
                </div>
            </div>
        );
    }



    const handleThumbnailClick = (index) => {
        setSelectedIndex(index);
    };


    useEffect(() => {
        dispatch(getProductDetails(id))
        window.scrollTo(0, 0);


    }, [dispatch, id])

    return (
        <div className="wrapper">
            <div className="flexColStart paddings innerWidth property-container" >
                <Grid container className="cont">
                    <Grid item xs={7}>
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item style={{ width: '93%' }} >
                                <div style={{ display: 'flex', paddingTop: '1rem' }}>

                                    <div style={{ marginRight: '10px', marginLeft: '10px', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
                                        {productDetail?.images &&
                                            productDetail?.images.map((item, index) => (
                                                <img
                                                    key={index}
                                                    src={item.url}
                                                    alt={`thumbnail-${index}`}
                                                    width={80}
                                                    height={80}
                                                    style={{ marginBottom: '5px', cursor: 'pointer' }}
                                                    onClick={() => handleThumbnailClick(index)}
                                                />
                                            ))}
                                    </div>


                                    <div >
                                        <Carousel showThumbs={false} infiniteLoop={true} selectedItem={selectedIndex} onChange={setSelectedIndex}
                                            renderArrowPrev={(clickHandler, hasPrev) => (
                                                <div
                                                    className={`abso prevbb`}
                                                    onClick={clickHandler}>
                                                    <ChevronLeftIcon style={{ width: '50px', height: '50px', color: 'black', zIndex: '3' }} />

                                                </div>
                                            )}
                                            renderArrowNext={(clickHandler, hasNext) => (
                                                <div
                                                    className={`abso nextbb`}

                                                    onClick={clickHandler}

                                                >

                                                    <ChevronRightIcon style={{ width: '50px', height: '50px', color: 'black', zIndex: '3' }} />
                                                </div>
                                            )}

                                            width='650px'
                                            dynamicHeight={false}
                                        >
                                            {productDetail?.images &&
                                                productDetail?.images.map((item, index) => (
                                                    <div key={index} >
                                                        <img src={item.url} alt={`carousel-image-${index}`} width='100%' height='100%' />
                                                    </div>
                                                ))}
                                        </Carousel>
                                    </div>

                                </div>




                            </Grid>
                        </Grid>



                    </Grid>
                    <Grid item xs={5}  >
                        <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'row' }}>


                            <div className="flexColStart left" style={{ width: '100%' }}>




                            </div>






                        </Grid>

                        <Typography variant="h4" mt={2}>
                            {productDetail?.name}
                        </Typography>
                        {/* <Typography variant="h6" color="orange" mt={2}>
                            $ {productDetail?.price}
                        </Typography> */}

                        {/* Facilities */}
                        <Typography variant="body1" mt={2}>
                            {productDetail?.shortdesc}
                        </Typography>

                        <Typography variant="body1" mt={2} style={{ marginTop: '2.5rem' }}>
                            <Typography variant="h4" mt={2} style={{ marginBottom: '1rem' }}>
                                Description
                            </Typography>
                            <Typography variant="h7">
                                {productDetail?.description}
                            </Typography>
                        </Typography>


                        {/* Add to Cart Button */}
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ backgroundColor: '#cbcbe7' }}
                            onClick={() => addToCart(productDetail._id)}
                            fullWidth
                            sx={{ mt: 2 }}
                            startIcon={<AddShoppingCart />}
                        >
                            Add to Cart
                        </Button>

                    </Grid>
                    <Grid item xs={12} style={{display:'flex' , justifyContent:'center'}}>

                        {productDetail?.stripes && productDetail?.stripes.map((item, index) => {
                            return (
                                <>


                                    <Grid item xs={3} key={index} style={index === 0 ? { marginLeft: '8rem' } : {}}>
                                        <div className="apx" >
                                            <div className="main-image-container">
                                                <img src={item.pic.url} alt="Main" className="main-image" />
                                                <div className="mini-details">
                                                    <h4 className="product-name">{item.name}</h4>
                                                    <p className="product-price">₹{item.price}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </Grid>


                                </>
                            )
                        })}
                    </Grid>
                </Grid>










                {/* </div> */}

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Choose Product"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">


                            {productDetail?.stripes && productDetail?.stripes.map((item, index) => (
                                <div>

                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox defaultChecked />} label={item?.name} />

                                    </FormGroup>

                                </div>
                            ))}





                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{ color: 'blue' }} onClick={handleClose} >Save</Button>

                    </DialogActions>
                </Dialog>


            </div>
            <Residencies />

        </div>


    );
};

export default ProductDetail2;
