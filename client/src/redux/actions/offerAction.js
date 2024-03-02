import {cleanErrors,offerFail,offerRequest,offerSuccess,offerdeleteReset,offerdeletefail,offerdeletesuccess,offeruploadReset,offeruploadSuccess} from "../slices/offerSlice";
import axios from 'axios';
import {BASE_URL} from '../../constants/baseurl'

// Add address 

export const addoffer = (addressdata)=> async(dispatch)=>{

    try {
        console.log(Object.fromEntries(addressdata))
 
        dispatch(offerRequest());

        const config = {headers:{'Content-Type': 'multipart/form-data'}};

        const {data} = await axios.post(`${BASE_URL}api/v1/offer`, addressdata, config)
        console.log(data);
        dispatch(offeruploadSuccess(data))
        
    } catch (error) {
        dispatch(offerFail(error?.response?.data?.message))
    }

}


// Get address 

export const getoffers = ()=> async(dispatch)=>{

    try {

        dispatch(offerRequest());

        const {data} = await axios.get(`${BASE_URL}api/v1/offer`)
        // console.log(data?.banners);
        console.log(data);
        dispatch(offerSuccess(data?.offers))
        
    } catch (error) {
        dispatch(offerFail(error.response.data.message))
    }

}



// Delete address 

export const deleteoffer = (id)=> async(dispatch)=>{

    try {
        dispatch(offerRequest());

        const {data} = await axios.delete(`${BASE_URL}api/v1/offer/${id}`)
        // console.log(data?.banners);
        dispatch(offerdeletesuccess(data))
        
    } catch (error) {
        dispatch(offerdeletefail(error.response.data.message))
    }

}

