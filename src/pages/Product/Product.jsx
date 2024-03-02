import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Product.css";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import ProductCard from "../../components/ProductCard/ProductCard";
import Image1 from './hero-1.jpg'
import Image2 from '/1.jpg'
import Image3 from '/2.jpg'
import Image4 from '/3.jpg'
import Image5 from '/4.jpg'
import Image6 from '/6.jpg'
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../redux/actions/productAction";
import Prcard from "../../components/productCard2/Prcard";

const Product = () => {
  // const { data, isError, isLoading } = useProperties();

  const dispatch = useDispatch();

  const [filter, setFilter] = useState("");


  const { product } = useSelector((state) => state.product)

  let isLoading = false;
  let isError = false;



  useEffect(()=>{
dispatch(getAdminProduct())
  },[dispatch])


  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
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
    );
  }
  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />

        <div className="paddings flexCenter properties">
          {
            // data.map((card, i)=> (<PropertyCard card={card} key={i}/>))

            product
           
              .map((card, i) => (
                <Prcard card={card} key={i} />
              ))
          }
        </div>
      </div>

  

    </div>
  );
};

export default Product;
