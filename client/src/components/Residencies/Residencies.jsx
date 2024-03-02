import React, { useEffect } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "./Residencies.css";
import { sliderSettings } from "../../utils/common";
import PropertyCard from "../PropertyCard/PropertyCard";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from 'react-spinners'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useDispatch, useSelector } from "react-redux";

import { getpopularproduct } from "../../redux/actions/popularproductAction";

const Residencies = () => {

  const { data, isError, isLoading } = useProperties()
  const dispatch = useDispatch();


  const { popularproduct } = useSelector((state) => state.popularproduct)



  const options = {
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    animateOut: 'slideOutUp',
    nav: false,
    dots: false,
    mouseDrag: true,
    margin: 5,
    responsive: {
      1100: {
        items: 4,
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

  useEffect(() => {
    dispatch(getpopularproduct())
  }, [dispatch])


  return (
    <div id="residencies" className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="flexColStart r-head">
          {/* <span className="orangeText">Best Choices</span> */}
          <span className="primaryText flexcenter">Popular Products</span>
        </div>
        {/* <SlideNextButton /> */}
        {/* slider */}

        <OwlCarousel className='owl-theme' {...options}>


          {popularproduct?.allproduct?.map((item, i) => (
            <div className='item' key={i}>
              <PropertyCard card={item?.product} />
            </div>

          ))}








        </OwlCarousel>
      </div>
    </div>
  );
};

export default Residencies;

const SlideNextButton = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()} className="r-prevButton">
        &lt;
      </button>
      <button onClick={() => swiper.slideNext()} className="r-nextButton">
        &gt;
      </button>
    </div>
  );
};
