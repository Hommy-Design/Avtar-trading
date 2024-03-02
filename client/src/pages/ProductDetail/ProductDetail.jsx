import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { AiFillHeart } from "react-icons/ai";
import "./ProductDetail.css";

import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import Map from "../../components/Map/Map";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import Heart from "../../components/Heart/Heart";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../redux/actions/productAction.js";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Grid } from "@mui/material";
import { Shower, DriveEta, MeetingRoom, AddShoppingCart, Brightness1Sharp } from '@mui/icons-material';
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
import Residencies from "../../components/Residencies/Residencies.jsx";
import ReactImageMagnify from 'react-image-magnify';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import { Carousel as Caru } from "@material-tailwind/react";
import { addItemsToCart } from "../../redux/actions/cartActions.js";


const ProductDetail = () => {

  let dispatch = useDispatch()
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);




  const { id } = useParams();

  const [modalOpened, setModalOpened] = useState(false);
  const { productDetail } = useSelector((state) => state.product)


  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
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
  const addToCart = (id) => {
    dispatch(addItemsToCart({'productId':id}))

 };


  useEffect(() => {
    dispatch(getProductDetails(id))
    window.scrollTo(0, 0);


  }, [dispatch, id])

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">

        <Grid container spacing={2}>
          <Grid item xs={6}>

            <div style={{ display: 'flex', paddingTop: '4rem' }}>

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


              <Carousel showThumbs={false} infiniteLoop={true} selectedItem={selectedIndex} onChange={setSelectedIndex}
                renderArrowPrev={(clickHandler, hasPrev) => (
                  <div
                    className={`abso prevb`}
                    onClick={clickHandler}>
                    <ChevronLeftIcon style={{ width: '50px', height: '50px', color: 'black', zIndex: '3' }} />

                  </div>
                )}
                renderArrowNext={(clickHandler, hasNext) => (
                  <div
                    className={`abso nextb`}

                    onClick={clickHandler}

                  >

                    <ChevronRightIcon style={{ width: '50px', height: '50px', color: 'black', zIndex: '3' }} />
                  </div>
                )}
              >
                {productDetail?.images &&
                  productDetail?.images.map((item, index) => (
                    <div key={index} onClick={() => openModal(item.url)} >
                      <img src={item.url} alt={`carousel-image-${index}`} width={620} height={620}
                      />
                    </div>
                  ))}
              </Carousel>
              <Modal
                open={modalIsOpen}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
                style={{ opacity: 787970 }}
              >




                <Caru className="rounded-xl">
                  {productDetail?.images &&
                    productDetail?.images.map((item, index) => (
                      <Paper style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="h-full w-full object-cover">
                        <img src={item.url} alt="Zoomed Image" style={{ height: '80vh', width: '90vw', marginTop: '5rem', filter: `brightness(1)` }} />
                      </Paper>
                    ))}
                </Caru>







              </Modal>

            </div>


          </Grid>
          <Grid item xs={6}>
            <div className="flexCenter property-details" style={{ padding: '3.5rem' }}>
              {/* left */}
              <div className="flexColStart left">

                <Typography variant="h4" mt={2}>
                  {productDetail?.name}
                </Typography>
                <Typography variant="h6" color="orange" mt={2}>
                ₹ {productDetail?.price}
                </Typography>

                {/* Facilities */}
                <Typography variant="body1" mt={2}>
                  {productDetail?.shortdesc}
                </Typography>
               
                <Typography variant="body1" mt={2}>
                  <Typography variant="h4" style={{ marginBottom: '1rem' }}>Description</Typography>
                  <Typography variant="h7" style={{marginBottom:'1rem'}}> 
                  {productDetail?.description}
                  </Typography>
                </Typography>



                {/* Add to Cart Button */}
                <Button
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: '#cbcbe7' }}
                  onClick={()=>addToCart(productDetail._id)}
                  fullWidth
                  sx={{ mt: 2 }}
                  startIcon={<AddShoppingCart />}
                >
                  Add to Cart
                </Button>
  
              </div>

            </div>      </Grid>
        </Grid>


      </div>
      <Residencies />

    </div>


  );
};

export default ProductDetail;
