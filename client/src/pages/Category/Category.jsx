import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Category.css";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ReactRoundedImage from "react-rounded-image"
import ProductCard from "../../components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getcategory } from "../../redux/actions/categoryAction";
import { getAdminProduct } from "../../redux/actions/productAction";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getsubcategory } from "../../redux/actions/subcategoryAction";
import { Grid, Typography } from '@mui/material'
import { Slider } from "@mantine/core";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Prcard from "../../components/productCard2/Prcard";
import TilesCard from "../../components/productCard2/TilesCard";
import Menu from '@mui/material/Menu';

const Properties = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const [nameParams] = useSearchParams()
  const [subprod, setSubprod] = useState([])
  const [price, setPrice] = useState([0, 25000]);
  const [anchorEl, setAnchorEl] = useState(null);



  let categoryName = nameParams.get('name');

  const { data, isError, isLoading } = useProperties();
  const { category } = useSelector((state) => state.category);
  const { product } = useSelector((state) => state.product)
  const { subcategory } = useSelector((state) => state.subcategory)
  console.log(subcategory);

  let filterProduct = product?.filter((item) => item?.category?.name === categoryName.toString())

  const [filter, setFilter] = useState("");
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const options = {
    items: 1,
    // loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    animateOut: 'slideOutUp',
    nav: false,
    dots: false,
    mouseDrag: true,
    margin: 1,
    autoplayHoverPause: true,
    responsive: {
      1100: {
        items: 8,
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
  let handelsubcat = (subcat) => {
    let filsubcat = filterProduct?.filter((item) => item?.subcategory?.name === subcat.toString())
    setSubprod(filsubcat);

  }
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice)
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);


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



  useEffect(() => {
    dispatch(getcategory())
    dispatch(getAdminProduct())
    dispatch(getsubcategory(params.categoryId))

  }, [dispatch])


  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">

        <OwlCarousel className='owl-theme' {...options}>

          {subcategory?.map((cat, i) => (
            <div className='item' key={i} onClick={() => handelsubcat(cat.name)}
              aria-controls="horizontal-menu"
              aria-haspopup="true"
              onMouseOver={handleMenuOpen}
              onMouseOut={handleMenuClose}
            >
              <ReactRoundedImage
                image={cat?.image?.url}
                roundedColor="#FFFFFF"
                imageWidth="150"
                imageHeight="150"
              // roundedSize="13"
              // borderRadius="70"

              />
              <span className="category-name">{cat.name}</span>
              <Menu
                id="horizontal-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                getContentAnchorEl={null}
                style={{ display: 'flex', flexDirection: 'row' }}
              >
                <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
                <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
                <MenuItem onClick={handleMenuClose}>Option 3</MenuItem>
              </Menu>

            </div>

          ))}

        </OwlCarousel>


        <SearchBar filter={filter} setFilter={setFilter} />

        <Grid container spacing={1}>
          <Grid item xs={2.5} >
            <Typography className="flexcenter" style={{ fontSize: '20px' }}>Filter</Typography>


            <FormControl fullWidth style={{ width: '96%', marginTop: '30px', marginBottom: '20px' }}>
              <InputLabel id="demo-simple-select-label">Choose</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>


            <Typography className="flexcenter" style={{ fontSize: '20px' }}>Price</Typography>

            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              min={0}
              max={25000}
              style={{ width: '95%', marginTop: '8px', marginBottom: '30px' }}
            />



            <Typography className="flexcenter" style={{ fontSize: '20px' }}>Brands</Typography>

            <div style={{ marginTop: '8px', marginBottom: '8px' }}>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 290 }}
              >

                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search For Brands"
                  inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

              </Paper>
            </div>

            <div style={{ fontSize: '15px' }} >KK Lights</div>
            <div style={{ fontSize: '15px' }} >A Star</div>
            <div style={{ fontSize: '15px' }} >Range Sagar</div>
            <div style={{ fontSize: '15px' }} >Grotto</div>
            <div style={{ fontSize: '15px' }} >Woven Gold</div>


            <Typography className="flexcenter" style={{ fontSize: '20px', marginTop: '30px', marginBottom: '20px' }}>Categories</Typography>


            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="panel1a-header"
              >
                <Typography>category 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Link>sub-category1</Link>

              </AccordionDetails>
              <AccordionDetails>
                <Link>sub-category2</Link>

              </AccordionDetails>
              <AccordionDetails>

                <Link>sub-category3</Link>
              </AccordionDetails>
            </Accordion>




            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="panel1a-header"
              >
                <Typography>category 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Link>sub-category1</Link>

              </AccordionDetails>
              <AccordionDetails>
                <Link>sub-category2</Link>

              </AccordionDetails>
              <AccordionDetails>

                <Link>sub-category3</Link>
              </AccordionDetails>
            </Accordion>




          </Grid>
          <Grid item xs={9.5}>
            <div className="paddings flexCenter properties">

              {
                // data.map((card, i)=> (<PropertyCard card={card} key={i}/>))
                categoryName === 'Tiles' ?
                  filterProduct
                    .map((card, i) => (
                      <TilesCard card={card} key={i} />)) :
                  filterProduct
                    .map((card, i) => (
                      <Prcard card={card} key={i} />))


              }




            </div>

          </Grid>

        </Grid>

      </div>
    </div>
  );
};

export default Properties;
