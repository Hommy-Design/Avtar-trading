import {categoryFail,categoryRequest,categorySuccess,categorydeletefail,categorydeletesuccess,categoryrdeleteReset,categoryuploadSuccess,cleanErrors} from "../slices/categorySlice";
import axios from 'axios';
import {BASE_URL} from '../../constants/baseurl'

// Add Category 

export const addcategory = (categorydata)=> async(dispatch)=>{

    try {

 
        dispatch(categoryRequest());

        const config = {headers:{'Content-Type': 'multipart/form-data'}};

        const {data} = await axios.post(`${BASE_URL}api/v1/admin/category`, categorydata, config)
        // console.log(data);
        dispatch(categoryuploadSuccess(data))
        
    } catch (error) {
        dispatch(categoryFail(error?.response?.data?.message))
    }

}


// Get Category 

export const getcategory = ()=> async(dispatch)=>{

    try {

        dispatch(categoryRequest());

        const {data} = await axios.get(`${BASE_URL}api/v1/admin/category`)
        // console.log(data?.banners);
        // console.log(data);
        dispatch(categorySuccess(data?.category))
        
    } catch (error) {
        dispatch(categoryFail(error.response.data.message))
    }

}



// Delete Category 

export const deletecategory = (id)=> async(dispatch)=>{

    try {

        dispatch(categoryRequest());

        const {data} = await axios.delete(`${BASE_URL}api/v1/admin/category/${id}`)
        // console.log(data?.banners);
        dispatch(categorydeletesuccess(data))
        
    } catch (error) {
        dispatch(categorydeletefail(error.response.data.message))
    }

}


// Clearing Errors 
export const clearError = ()=> async(dispatch)=>{
    dispatch(cleanErrors());
}