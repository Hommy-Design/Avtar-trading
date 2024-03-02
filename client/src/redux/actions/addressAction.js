import {addressFail,addressRequest,addressSuccess,addressdeletefail,addressdeletesuccess,addressrdeleteReset,addressuploadSuccess,cleanErrors} from "../slices/addressSlice";
import axios from 'axios';
import {BASE_URL} from '../../constants/baseurl'

// Add address 

export const addaddress = (addressdata)=> async(dispatch)=>{

    try {
        // console.log(Object.fromEntries(addressdata))
 
        dispatch(addressRequest());

        const config = {headers:{'Content-Type': 'multipart/form-data'}};

        const {data} = await axios.post(`${BASE_URL}api/v1/address`, addressdata, config)
        console.log(data);
        dispatch(addressuploadSuccess(data))
        
    } catch (error) {
        dispatch(addressFail(error?.response?.data?.message))
    }

}


// Get address 

export const getaddress = ()=> async(dispatch)=>{

    try {

        dispatch(addressRequest());

        const {data} = await axios.get(`${BASE_URL}api/v1/address`)
        // console.log(data?.banners);
        console.log(data);
        dispatch(addressSuccess(data?.addresses))
        
    } catch (error) {
        dispatch(addressFail(error.response.data.message))
    }

}



// Delete address 

export const deleteaddress = (id)=> async(dispatch)=>{

    try {

        dispatch(addressRequest());

        const {data} = await axios.delete(`${BASE_URL}api/v1/address/${id}`)
        // console.log(data?.banners);
        dispatch(addressdeletesuccess(data))
        
    } catch (error) {
        dispatch(addressdeletefail(error.response.data.message))
    }

}


// Clearing Errors 
export const clearError = ()=> async(dispatch)=>{
    dispatch(cleanErrors());
}