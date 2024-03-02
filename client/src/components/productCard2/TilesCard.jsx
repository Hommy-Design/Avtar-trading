import React, { useEffect, useState } from 'react'
import './prcard.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TilesCard = ({ card }) => {

  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();


  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  useEffect(()=>{
    window.scrollTo(0, 0);
    
  },[])

  return (


    <div className="product-card" onClick={() => navigate(`/product2/${card._id}`)}
    >
      <div className="product-image">
        <img src={isHovered ? card?.images[0]?.url : card?.images[1]?.url}
          alt={card?.name}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut} />
        <div className="discount-badge">{card?.discount}% OFF</div>
      </div>
      <div className="product-details">
        <h3 className="product-title flexcenter">{card?.name}</h3>
        <div className="price-container">

        </div>
        <div className="additional-images" style={{display:'flex', justifyContent:'space-evenly'}}>
          {/* Add three small images below the prices here */}
         {card.stripes.map((item,index)=>(
           <div className="additional-image" key={index} >
           <img src={item.pic.url} alt="Additional 1" />
           <div className="image-details">
             <p className="image-name">{item.name}</p>
             <p className="image-price">₹{item.price}</p>
           </div>
         </div>
         ))}
        
         
         
        </div>
        <div className='flexcenter' style={{ fontSize: '12px', padding: '2px' }}>
          (Inclusive of all taxes)
        </div>

      </div>
    </div>



  )
}

export default TilesCard