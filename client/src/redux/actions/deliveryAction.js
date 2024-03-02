import {cleanErrors,deliveryFail,deliveryRequest,deliverySuccess,deliverydeleteReset,deliverydeletefail,deliverydeletesuccess,deliveryuploadSuccess} from "../slices/deliverySlice";
import axios from 'axios';
import {BASE_URL} from '../../constants/baseurl'

// Add address 

export const adddelivery = (addressdata)=> async(dispatch)=>{

    try {
        // console.log(Object.fromEntries(addressdata))
 
        dispatch(deliveryRequest());

        const config = {headers:{'Content-Type': 'multipart/form-data'}};

        const {data} = await axios.post(`${BASE_URL}api/v1/delivery`, addressdata, config)
        console.log(data);
        dispatch(deliveryuploadSuccess(data))
        
    } catch (error) {
        dispatch(deliveryFail(error?.response?.data?.message))
    }

}


// Get address 

export const getdelivery = ()=> async(dispatch)=>{

    try {

        dispatch(deliveryRequest());

        const {data} = await axios.get(`${BASE_URL}api/v1/delivery`)
        // console.log(data?.banners);
        console.log(data);
        dispatch(deliverySuccess(data?.addresses))
        
    } catch (error) {
        dispatch(deliveryFail(error.response.data.message))
    }

}



// Delete address 

export const deletedelivery = (id)=> async(dispatch)=>{

    try {

        dispatch(deliveryRequest());

        const {data} = await axios.delete(`${BASE_URL}api/v1/delivery/${id}`)
        // console.log(data?.banners);
        dispatch(deliverydeletesuccess(data))
        
    } catch (error) {
        dispatch(deliverydeletefail(error.response.data.message))
    }

}

