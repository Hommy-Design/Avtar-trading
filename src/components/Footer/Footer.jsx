import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/* left side */}
        <div className="flexColStart f-left">
          <img src="/dist/Capa 1HommyLogo.png" alt="" width={120} />
          <span className="secondaryText">
            Our vision is to make all people <br />
            the best place to live for them.
          </span>
        </div>

        <div className="flexColCenter f-right">
          <span className="primaryText">Information</span>
          <span className="secondaryText">145 New Delhi, DL 5467, INDIA</span>
          <div className="flexCenter f-menu">
            <span><Link to='/refundpolicy'>return policy</Link></span>
            <span><Link to='/termcondition'>terms & conditions</Link></span>
            <span><Link to='/privacypolicy'>privacy policy</Link></span>
            <span><Link to='/shoppingpolicy'>shipping policy</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
