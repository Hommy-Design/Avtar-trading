import { Suspense, useEffect, useState } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";

import Website from "./pages/Website";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryHome from "./pages/Category/Category";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDetailContext from "./context/UserDetailContext";
import Bookings from "./pages/Bookings/Bookings";
import Favourites from "./pages/Favourites/Favourites";
import Product from "./pages/Product/Product";

import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import AdminProduct from "./scenes/product/product";
import FAQ from "./scenes/faq";
import Category from "./scenes/categories";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Admin from "./Admin";

import LoginSignup from "./components/LoginSignup/LoginSignup";
import HomeBanner from "./scenes/homeBanner/homeBanner";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/userAction";
import store from "./redux/store/store";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Prcard from "./components/productCard2/Prcard";
import ProductDetail2 from "./components/ProductDetail2/ProductDetail2";
import AboutUs from "./pages/AboutUs/AboutUs";
import FloatBulkOrder from "./components/BulkOrderButton/FloatBulkOrder";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import CartPage from "./components/CartPage/CartPage";
import OfferPage from "./components/Offer/OfferPage";
import PhoneVerify from "./components/PhoneVerify/PhoneVerify";
import Delivery from "./scenes/delivery/delivery";
import PopularProduct from "./scenes/popularproduct/popularproduct";
import Offer from "./scenes/offer/offer";
import PrivcyPolice from "./pages/PrivcyPolice";
import TermsCondtion from "./pages/TermsCondtion";
import ShoppingPolicy from "./pages/ShoppingPolicy";
import RefundPolicy from "./pages/RefundPolicy";




function App() {

  const dispatch = useDispatch();

  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });


  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log(user);

  // useEffect(() => {
  //   store.dispatch(loadUser());

  // }, []);


  let a = 58

  if (user?.user?.isAdmin) {
    localStorage.setItem('router', 'admin')
  } else {
    localStorage.removeItem('router')
  }


  if (localStorage.getItem('router') === 'admin') {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/categories" element={<Category />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/banner" element={<HomeBanner />} />
                <Route path="/delivery" element={<Delivery />} />
                <Route path="/popularproducts" element={<PopularProduct />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/admin/product" element={<AdminProduct />} />
                <Route path="/admin/offer" element={<Offer />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                {/* <Route path="/calendar" element={<Calendar />} /> */}
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
        <ToastContainer />
      </ColorModeContext.Provider>
    )
  }


  return (

    //   <ColorModeContext.Provider value={colorMode}>
    //   <ThemeProvider theme={theme}>
    //     <CssBaseline />
    //     <div className="app">
    //       <Sidebar isSidebar={isSidebar} />
    //       <main className="content">
    //         <Topbar setIsSidebar={setIsSidebar} />
    //         <Routes>
    //           <Route path="/" element={<Dashboard />} />
    //           <Route path="/team" element={<Team />} />
    //           <Route path="/categories" element={<Category />} />
    //           <Route path="/contacts" element={<Contacts />} />
    //           <Route path="/invoices" element={<Invoices />} />
    //           <Route path="/form" element={<Form />} />
    //           <Route path="/bar" element={<Bar />} />
    //           <Route path="/pie" element={<Pie />} />
    //           <Route path="/line" element={<Line />} />
    //           <Route path="/faq" element={<FAQ />} />
    //           {/* <Route path="/calendar" element={<Calendar />} /> */}
    //           <Route path="/geography" element={<Geography />} />
    //         </Routes>
    //       </main>
    //     </div>
    //   </ThemeProvider>
    // </ColorModeContext.Provider>


    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>


      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          <Route path="/admin/*" element={<LoginSignup />} />

          {/* <Route path="/login" element={<LoginSignup />} /> */}
          <Route element={<Layout />}>
            <Route path="/" element={<Website />} />

            <Route path="/category/:categoryId">
              <Route index element={<CategoryHome />} />
              {/* <Route path=":propertyId" element={<Property />} /> */}
            </Route>
            <Route path="/product" element={<Product />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/product2/:id" element={<ProductDetail2 />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/offers" element={<OfferPage />} />
            <Route path="/phone" element={<PhoneVerify />} />
            <Route path="/privacypolicy" element={<PrivcyPolice />} />
            <Route path="/termcondition" element={<TermsCondtion />} />
            <Route path="/shoppingpolicy" element={<ShoppingPolicy />} />
            <Route path="/refundpolicy" element={<RefundPolicy />} />
          </Route>
        </Routes>
      </Suspense>
      <FloatBulkOrder />
      <ToastContainer />
    </UserDetailContext.Provider>
  );
}

export default App;
