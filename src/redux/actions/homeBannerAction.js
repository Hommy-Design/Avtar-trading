import {bannerFail, bannerRequest, bannerSuccess,bannerdelete,bannerdeleteReset,bannerdeletefail,bannerdeletesuccess,banneruploadSuccess, cleanErrors} from "../slices/homeBannerSlice";
import axios from 'axios';
import {BASE_URL} from '../../constants/baseurl'

// Add Banner 

export const addbanner = (bannerdata)=> async(dispatch)=>{

    try {

 
        dispatch(bannerRequest());

        const config = {headers:{'Content-Type': 'multipart/form-data'}};

        const {data} = await axios.post(`${BASE_URL}api/v1/banner`, bannerdata, config)
        dispatch(banneruploadSuccess(data))
        
    } catch (error) {
        dispatch(bannerFail(error.response.data.message))
    }

}


// Get Banner 

export const getbanner = ()=> async(dispatch)=>{

    try {

        dispatch(bannerRequest());

        const {data} = await axios.get(`${BASE_URL}api/v1/banner`)
        // console.log(data?.banners);
        dispatch(bannerSuccess(data?.banners))
        
    } catch (error) {
        dispatch(bannerFail(error.response.data.message))
    }

}



// Delete Banner 

export const deletebanner = (id)=> async(dispatch)=>{

    try {

        dispatch(bannerRequest());

        const {data} = await axios.delete(`${BASE_URL}api/v1/banner/${id}`)
        // console.log(data?.banners);
        dispatch(bannerdeletesuccess(data))
        
    } catch (error) {
        dispatch(bannerdeletefail(error.response.data.message))
    }

}


// Clearing Errors 
export const clearError = ()=> async(dispatch)=>{
    dispatch(cleanErrors());
}