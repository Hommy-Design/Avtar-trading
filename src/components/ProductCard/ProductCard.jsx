import React from "react";
import './ProductCard.css'
import {AiFillHeart} from 'react-icons/ai'
import {truncate} from 'lodash'
import { useNavigate } from "react-router-dom";
import Heart from "../Heart/Heart";


const ProductCard = ({card}) => {

  const navigate = useNavigate();
  return (
    <div className="flexColStart r-cardd"
    onClick={()=>navigate(`/product/${card._id}`)}
    >
      <Heart id={card?._id}/>
      <img src={card?.images[0]?.url} alt="home" />
      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>$</span>
        <span>{card?.price}</span>
      </span>
      <span className="primaryText">{truncate(card?.name, {length: 15})}</span>
      <span className="secondaryText">{truncate(card?.description, {length: 80})}</span>
    </div>
  );
};

export default ProductCard;
