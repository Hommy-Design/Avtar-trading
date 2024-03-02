import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import AddPropertyModal from "../AddPropertyModal/AddPropertyModal";
import useAuthCheck from "../../hooks/useAuthCheck.jsx";
import { useNavigate } from "react-router-dom";
import PhoneVerify from "../PhoneVerify/PhoneVerify.jsx";
import { useSelector } from "react-redux";


const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const headerColor = useHeaderColor();
  const [modalOpened, setModalOpened] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);


  const navigate = useNavigate();

  const { isuserAuthenticated } = useSelector((state) => state.userlogin)


  const user = {
    picture: "hjbhjb",
    name: "jbjbj"
  }


  const { validateLogin } = useAuthCheck();


  const handleAddPropertyClick = () => {
    if (validateLogin()) {
      setModalOpened(true);
    }
  };


  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };


  let loginhandler = () => {
    navigate('/login')
  }


  return (
    <section className={window.location.pathname === '/'?'h-wrapperf':'h-wrappers'} style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link to="/">
          <img src="/logoooo.png" alt="logo" width={100} />
        </Link>

        {/* menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            // ref={menuRef}
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)}
          >
            <NavLink to="/Product">Products</NavLink>
            <NavLink to="/offers">Offers</NavLink>
            <NavLink to="/about">About Us</NavLink>

            {/* add property */}
            {/* <div onClick={handleAddPropertyClick}>Profile</div>
            <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} /> */}
            {/* login button */}
            {!isuserAuthenticated ? (
             <div>
               <button className="button" onClick={handleOpenPopup} >
                Login
              </button>
              <PhoneVerify open={isPopupOpen} onClose={handleClosePopup}/>
             </div>
            ) : (
              <>
              <NavLink to="/profile">Profile</NavLink>
              <NavLink to="/cart">Cart</NavLink>
              </>
            )}
          </div>
        </OutsideClickHandler>

        {/* for medium and small screens */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
