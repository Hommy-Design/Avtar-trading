import { Box, ListItemButton, Typography, useTheme, Button, DialogTitle, IconButton, DialogContent, Dialog, DialogActions, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../adminComponents/Header";


import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { addcategory, deletecategory, getcategory } from "../../redux/actions/categoryAction";
import { addsubcategory, getsubcategory } from "../../redux/actions/subcategoryAction";
import { useDispatch, useSelector } from "react-redux";
import { categoryrdeleteReset } from "../../redux/slices/categorySlice";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { addsub_Subcategory, getsub_Subcategory } from "../../redux/actions/subsubcategoryAction";



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));



const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const Category = () => {

  const dispatch = useDispatch();


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [imagePreview, setImagePreview] = useState([])
  const [subimagePreview, setSubimagePreview] = useState([])
  const [images, setImages] = useState([])
  const [subimages, setSubimages] = useState([])
  const [name, setName] = useState('')
  const [subcatname, setsubcatname] = useState('')
  const [open, setOpen] = useState(false);
  const [catopen, setCatopen] = useState(false);
  const [subc, setSubc] = useState(false);
  const [subsubc, setSubsubc] = useState(false);
  const [subsubcat, setSubsubcat] = useState(false);
  const [subcatid, setSubcatid] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subsubname, setsubsubname] = useState('')



  const { isLoading, error, category, isDeleted, isUploaded } = useSelector((state) => state.category)
  const { subcategory } = useSelector((state) => state.subcategory)
  const { subsubcategory } = useSelector((state) => state.subsubcategory)



  const subcategoryChange = (e) => {
    const files = Array.from(e.target.files)
    // console.log(files);

    setSubimages([]);
    setSubimagePreview([])

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setSubimagePreview((old) => [...old, reader.result])
          setSubimages((old) => [...old, reader.result])
        }
      }

      reader.readAsDataURL(file);

    })

  }

  const categoryChange = (e) => {
    const files = Array.from(e.target.files)
    // console.log(files);

    setImages([]);
    setImagePreview([])

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview((old) => [...old, reader.result])
          setImages((old) => [...old, reader.result])
        }
      }

      reader.readAsDataURL(file);

    })

  }

  const handleSubmit = (e) => {

    e.preventDefault();

    setOpen(false);

    const myForm = new FormData();

    myForm.append('file', images)
    myForm.append('name', name)

    dispatch(addcategory(myForm))



  }
  const handlesubcatsubmit = (e) => {

    e.preventDefault();

    setSubc(false);

    const subForm = new FormData();

    subForm.append('file', subimages)
    subForm.append('name', subcatname)

    dispatch(addsubcategory(subForm, subcatid))

  }

  const handleDelete = (id) => {
    dispatch(deletecategory(id))
  }


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleclickcategory = (id) => {

    setSubcatid(id)
    dispatch(getsubcategory(id))
    setCatopen(true)
  }

  const addsubsubcategory = (id) => {

    setSubcatid(id)
    dispatch(getsubcategory(id))
    setSubsubc(true)
  }

  const viewsubsubcategory = (id) => {
    setSubsubcat(true)
    dispatch(getsub_Subcategory(id))

  }

  const handleclickcategoryclose = () => {

    setCatopen(false)
  }
  const handleclicksubsubcategoryclose = () => {

    setSubsubcat(false)
  }

  const handlesubcat = () => {
    setSubc(true)

  }
  const handlesubcatclose = () => {
    setSubc(false)

  }
  const handlesubsubcatclose = () => {
    setSubsubc(false)

  }




  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleNameChange = (event) => {
    setsubsubname(event.target.value);
  };



  const handlesubsubcatsubmit = ()=>{
// console.log(subsubname);
// console.log(selectedCategory);
console.log('hjgjguj');
dispatch(addsub_Subcategory(subsubname, selectedCategory))
  }




  useEffect(() => {

    if (isUploaded) {
      toast.success("Category Uploaded successfully", { position: "top-right" })

      dispatch(getcategory())
    }

    if (isDeleted) {
      toast.success("Category Deleted successfully", { position: "top-right" })

      dispatch(categoryrdeleteReset())
    }

    dispatch(getcategory())
  }, [dispatch, isDeleted, isUploaded])



  return (
    <Box m="20px">
      <Header title="CATEGORIES" subtitle="Managing the Categories" />



      <Box display="flex" justifyContent="end" mt="20px">

        <Button color="secondary" variant="contained" onClick={handleClickOpen}>
          Add Category
        </Button>
      </Box>


      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      // style={{width:'100%', height:'100% '}}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Category
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers style={{ display: 'flex', flexDirection: 'column' }}>


          <TextField
            id="outlined-controlled"
            label="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: '10px' }}
          />

          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Upload Category Img
            <VisuallyHiddenInput type="file" name="file" onChange={categoryChange} />

          </Button>

          <div id="BannerImage">

            {imagePreview.map((image, index) => (
              <img src={image} key={index} alt='Avatar Preview' />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit} color="secondary" variant="contained" >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>


      <List
        sx={{
          // width: '100%',
        }}
      >
        {
          category?.map((data, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar alt="img2" src={data?.image?.url} sx={{ width: 100, height: 100 }} />
              </ListItemAvatar>
              <ListItemText style={{ display: 'flex', justifyContent: 'space-between', margin: '74px' }} primary={data?.name} />
              {/* <ListItemButton onClick={() => handleDelete(data._id)} style={{ justifyContent: 'center', width: '10px' }} >

            <EditIcon />
          </ListItemButton> */}
              <ListItemButton onClick={() => handleDelete(data._id)} style={{ justifyContent: 'center', width: '10px' }} >

                <DeleteIcon />
              </ListItemButton>
              <ListItemButton onClick={() => handleclickcategory(data._id)} style={{ justifyContent: 'center', width: '10px' }} >

                <ArticleIcon />
                Sub Categories
              </ListItemButton>
              <ListItemButton onClick={() => addsubsubcategory(data._id)} style={{ justifyContent: 'center', width: '10px' }} >
                <AddIcon />
               Add sub-subcat
              </ListItemButton>
            
            </ListItem>
          ))
        }


      </List>



      <BootstrapDialog
        onClose={handleclickcategoryclose}
        aria-labelledby="customized-dialog-title"
        open={catopen}

      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Sub Categories
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleclickcategoryclose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <List
            sx={{
              // width: '100%',
            }}
          >
            {
              subcategory?.map((data, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar alt="img2" src={data?.image?.url} sx={{ width: 100, height: 100 }} />
                  </ListItemAvatar>
                  <ListItemText style={{ display: 'flex', justifyContent: 'space-between', margin: '74px' }} primary={data?.name} />
                  {/* <ListItemButton onClick={() => handleDelete(data._id)} style={{ justifyContent: 'center', width: '10px' }} >

            <EditIcon />
          </ListItemButton> */}
                  <ListItemButton onClick={() => handleDelete(data._id)} style={{ justifyContent: 'center', width: '10px' }} >

                    <DeleteIcon />
                  </ListItemButton>
                  <ListItemButton onClick={() => {}} style={{ justifyContent: 'center', width: '10px', marginLeft:'1rem' }} >

                    <EditIcon />
                  </ListItemButton> 
                  <ListItemButton onClick={() => {viewsubsubcategory(data._id)}} style={{ justifyContent: 'center', width: '200px', marginLeft:'1rem' }} >

                   view sub-sub cat
                  </ListItemButton> 
                 

                </ListItem>
              ))
            }


          </List>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handlesubcat}>
            Add Sub-Category
          </Button>
        </DialogActions>
      </BootstrapDialog>


      <BootstrapDialog
        onClose={handleclicksubsubcategoryclose}
        aria-labelledby="customized-dialog-title"
        open={subsubcat}

      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Sub sub Categories
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleclicksubsubcategoryclose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <List
            sx={{
              // width: '100%',
            }}
          >
            {
              subsubcategory?.subSubcategory?.map((data, index) => (
                <ListItem key={index}>
                
                  <ListItemText style={{ display: 'flex', justifyContent: 'space-between', margin: '74px' }} primary={data?.name} />
                  
                  <ListItemButton onClick={() => {}} style={{ justifyContent: 'center', width: '10px' }} >

                    <DeleteIcon />
                  </ListItemButton>
                  <ListItemButton onClick={() => {}} style={{ justifyContent: 'center', width: '10px', marginLeft:'1rem' }} >

                    <EditIcon />
                  </ListItemButton> 
                 
                 

                </ListItem>
              ))
            }


          </List>
        </DialogContent>
       
      </BootstrapDialog>



    





      <Dialog open={subc} onClose={handlesubcatclose}>
        <DialogTitle>Add SubCategory</DialogTitle>
        <DialogContent>

          <TextField
            id="outlined-controlled"
            label="Sub-Category name"
            value={subcatname}
            onChange={(e) => setsubcatname(e.target.value)}
          />

          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Upload Sub-Category Img
            <VisuallyHiddenInput type="file" name="file" onChange={subcategoryChange} />

          </Button>

          <div id="BannerImage">

            {subimagePreview.map((image, index) => (
              <img src={image} key={index} alt='Avatar Preview' />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handlesubcatsubmit}>Save Changes</Button>
        </DialogActions>
      </Dialog>




    






      <Dialog open={subsubc} onClose={handlesubsubcatclose}>
        <DialogTitle>Add sub-SubCategory</DialogTitle>
        <DialogContent>

        <FormControl fullWidth>
        <InputLabel id="category-label">Select Category</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          value={selectedCategory}
          label="Select Category"
          onChange={handleCategoryChange}
        >
          {subcategory.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        id="name"
        label="Name"
        variant="outlined"
        value={subsubname}
        onChange={handleNameChange}
        style={{ marginTop: '16px' }}
      />

        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handlesubsubcatsubmit}>Save Changes</Button>
        </DialogActions>
      </Dialog>








    </Box>
  );
};

export default Category;
