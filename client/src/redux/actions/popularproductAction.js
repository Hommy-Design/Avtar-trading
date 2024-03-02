import {cleanErrors,popularproductFail,popularproductRequest,popularproductSuccess,popularproductcreatedSuccess,popularproductdeleteReset,popularproductdeletefail,popularproductdeletesuccess} from "../slices/popularproductSlice";
import axios from 'axios'
import {BASE_URL} from '../../constants/baseurl'



// get popularproduct
export const getpopularproduct = () => async (dispatch) =>{
    try {

        dispatch(popularproductRequest());

        // const config = {headers:{'Content-Type': 'multipart/form-data'}};

        const {data} = await axios.get(`${BASE_URL}api/v1/popularproduct`)
        console.log(data);
        dispatch(popularproductSuccess(data))
        
    } catch (error) {
        dispatch(popularproductFail(error?.response?.data?.message))
    }

}



// ADD popularproduct
export const addpopularproduct = (cartdata) => async (dispatch) =>{
    try {

 
        dispatch(popularproductRequest());

        // const config = {headers:{'Content-Type': 'multipart/form-data'}};

        const {data} = await axios.post(`${BASE_URL}api/v1/popularproduct`, {productId:cartdata})
        console.log(data);
        dispatch(popularproductcreatedSuccess(data))
        
    } catch (error) {
        dispatch(popularproductFail(error?.response?.data?.message))
    }

}


// delete popularproduct
export const deletepopularproduct = (id) => async (dispatch) =>{
    try {
console.log(id);
 
        dispatch(popularproductRequest());

        // const config = {headers:{'Content-Type': 'multipart/form-data'}};

        const {data} = await axios.delete(`${BASE_URL}api/v1/popularproduct/${id}`,)
        console.log(data);
        dispatch(popularproductdeletesuccess(data))
        
    } catch (error) {
        dispatch(popularproductdeletefail(error?.response?.data?.message))
    }

}

