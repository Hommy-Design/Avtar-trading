import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './ImageZoom.css';

const ImageZoom = ({ imageUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="image-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={imageUrl} alt="Product" className="image" />
      <CSSTransition
        in={isHovered}
        timeout={300}
        classNames="zoom"
        unmountOnExit
      >
        <div className="zoomed-image" style={{ backgroundImage: `url(${imageUrl})` }} />
      </CSSTransition>
    </div>
  );
};

export default ImageZoom;
