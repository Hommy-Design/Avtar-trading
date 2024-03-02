import "./Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import SearchBar from "../SearchBar/SearchBar";
import first from "./contact.jpg"
import second from "./hero-1.jpg"
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image';

import Slider1 from "/slider-1.jpg"
import Slider2 from "/slider-2.jpg"
import Slider4 from "/slider-4.jpg"
import Slider5 from "/slider-5.jpg"
import Slider6 from "/slider-6.jpg"
import { useDispatch, useSelector } from "react-redux";
import { getbanner } from "../../redux/actions/homeBannerAction";
import { useEffect } from "react";
import { getpopularproduct } from "../../redux/actions/popularproductAction";


const Hero = () => {

  const dispatch = useDispatch();

  const {isLoading, banner} = useSelector((state)=>state.banner)

  useEffect(()=>{

    dispatch(getpopularproduct())

    dispatch(getbanner())
},[dispatch])


  const fadeImages = [
    {
      url: Slider1,
    },
    {
      url: Slider2,
    },
    {
      url: Slider4
    },
    {
      url: Slider5
    },
    {
      url: Slider6
    },
  ];


  const options={
    duration:2000,
    transitionDuration:1500,
    arrows:false,
    infinite:true,
    autoplay:true

  }


  return (
   
    <div className="slide-container">
    <Fade {...options}>
      {banner?.map((data, index) => (
        <div key={index}>
          <img style={{ width: '100%', height:'100vh' }} src={data?.image?.url} />
        </div>
      ))}
    </Fade>
  </div>

  );
};

export default Hero;
