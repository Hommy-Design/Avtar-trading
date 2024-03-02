import {cleanErrors,productFail,productRequest,productSuccess,productdeleteReset,productdeletefail,productdeletesuccess,productploadSuccess,updateproductFail,updateproductRequest,updateproductReset,updateproductSuccess,adminproductFail,adminproductRequest,adminproductSuccess, productDetailFail,productDetailRequest,productDetailSuccess} from '../slices/productSlice'
import axios from 'axios';
import {BASE_URL} from '../../constants/baseurl'

//Add Product


export const addProduct = (productData) => async(dispatch)=>{

    try {
                console.log(Object.fromEntries(productData));


        dispatch(productRequest());

        const config = {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        }
        const {data} = await axios.post(`${BASE_URL}api/v1/product`, productData, config);
        
       console.log(data);

        dispatch(productploadSuccess(data));

        
    } catch (error) {
        dispatch(productFail(error?.response?.data?.message))
    }
}


// get All products for admin  

export const getAdminProduct = ()=> async (dispatch)=>{
    try {

        dispatch(adminproductRequest())
        
    
        const {data} = await axios.get(`${BASE_URL}api/v1/admin/products`)
        console.log(data);

        dispatch(adminproductSuccess(data.products))

     

    } catch (error) {
        dispatch(adminproductFail(error.response.data.message))
        
       
    }
}




// Get product details 

export const getProductDetails = (id)=> async(dispatch)=>{
    try {
        dispatch(productDetailRequest())
        const {data} = await axios.get(`${BASE_URL}api/v1/product/${id}`)
       console.log(data);
        dispatch(productDetailSuccess(data.product))

    } catch (error) {
        dispatch(productDetailFail(error.response.data.message))
    }
}



// deletedProduct 

export const deletedProduct = (id)=> async(dispatch)=>{
    try {
        dispatch(productRequest())
        const {data} = await axios.delete(`${BASE_URL}api/v1/product/${id}`)
       console.log(data);
        dispatch(productdeletesuccess(data))

    } catch (error) {
        dispatch(productdeletefail(error.response.data.message))
    }
}