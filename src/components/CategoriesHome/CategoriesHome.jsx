import React, { useEffect } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "./CategoriesHome.css";
import { sliderSettings } from "../../utils/common";
import PropertyCard from "../PropertyCard/PropertyCard";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from 'react-spinners'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ReactRoundedImage from "react-rounded-image"
import CategoryCard from './categorycard'
import { Grid } from '@mui/material';

import { useDispatch, useSelector } from "react-redux";
import { getcategory } from "../../redux/actions/categoryAction";


const Categories = () => {
  const dispatch = useDispatch();

  const { data, isError, isLoading } = useProperties()
  const { category } = useSelector((state) => state.category);





  const options = {
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 800,
    animateOut: 'slideOutUp',
    nav: false,
    dots: false,
    mouseDrag:true,
    margin: 1,
    autoplayHoverPause:true,
    responsive: {
      1100: {
        items: 8,
      },
      724: {
        items: 4
      },
      500: {
        items: 3
      },
      370: {
        items: 2,
        innerWidth: '100%',
        outerWidth: '100%'
      },

    }
  }



  if (isError) {
    return (
      <div className='wrapper'>
        <span>Error while fetching data</span>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    )
  }

  useEffect(()=>{
    dispatch(getcategory())

  },[dispatch])



  return (
    <div id="residencies" className="r-wrapper">
      <div className="paddings innerWidth r-container" style={{paddingLeft:'5rem', paddingRight:'5rem'}}>
        <div className="flexColStart r-head">
          <span className="primaryText flexcenter">Shop By Category</span>
        </div>
          {/* <SlideNextButton /> */}
          {/* slider */}
          {/* {data.slice(0, 8).map((card, i) => (
            <SwiperSlide key={i}>
              <PropertyCard card={card}/>
            </SwiperSlide>
          ))} */}

<div className=" flexCenter properties">






{category?.map((data, index)=>(
  <CategoryCard card={ {
    id:data?._id,
    image:data?.image?.url,
    title:data?.name,
  }} key={index} />
))}



  </div>




      </div>
    </div>
  );
};

export default Categories;

