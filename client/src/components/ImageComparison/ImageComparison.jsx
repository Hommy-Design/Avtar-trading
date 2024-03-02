import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "./ImageComparison.css";
import { sliderSettings } from "../../utils/common";
import PropertyCard from "../PropertyCard/PropertyCard";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from 'react-spinners'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import Image1 from './hero-1.jpg'
import Image2 from './contact.jpg'


const Categories = () => {

  const { data, isError, isLoading } = useProperties()

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


  return (
    <div id="residencies" className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="flexColStart r-head">
          <span className="primaryText flexcenter">Image Comparison</span>
          <p className="imgcom">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores minus, voluptate sed velit neque necessitatibus vero repellendus corrupti harum suscipit aliquid distinctio quas totam deleniti eligendi facilis repellat laboriosam. Alias!</p>
        </div>

        {/* <SlideNextButton /> */}
        {/* slider */}
        {/* {data.slice(0, 8).map((card, i) => (
            <SwiperSlide key={i}>
              <PropertyCard card={card}/>
            </SwiperSlide>
          ))} */}

        <div className="imgcom flexCenter properties" style={{height:'80vh'}}>
          <ReactCompareSlider
            boundsPadding={0}
            itemOne={<ReactCompareSliderImage alt="Image one" src={Image1} />}
            itemTwo={<ReactCompareSliderImage alt="Image two" src={Image2} />}
            keyboardIncrement="5%"
            position={50}
            style={{
              height: '90vh',
              width: '100%'
            }}
          />

        </div>


      </div>
    </div>
  );
};

export default Categories;

