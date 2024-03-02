import {cartFail,cartRequest,cartSuccess,cartdeletefail,cartdeletesuccess,cartrdeleteReset,cartcreatedSuccess,cleanErrors} from "../slices/cartSlice";
import axios from 'axios'
import {BASE_URL} from '../../constants/baseurl'



// get my cart
export const getmycart = () => async (dispatch) =>{
    try {

        dispatch(cartRequest());

        // const config = {headers:{'Content-Type': 'multipart/form-data'}};

        const {data} = await axios.get(`${BASE_URL}api/v1/cart`)
        console.log(data);
        dispatch(cartSuccess(data))
        
    } catch (error) {
        dispatch(cartFail(error?.response?.data?.message))
    }

}



// ADD TO CART
export const addItemsToCart = (cartdata) => async (dispatch) =>{
    try {

 console.log(cartdata);
        dispatch(cartRequest());

        // const config = {headers:{'Content-Type': 'multipart/form-data'}};

        const {data} = await axios.post(`${BASE_URL}api/v1/cart`, cartdata).then((err)=>{console.log(err);})
        console.log(data);
        dispatch(cartcreatedSuccess(data))
        
    } catch (error) {
        dispatch(cartFail(error?.response?.data?.message))
    }

}


// REMOVE FROM CART 

export const removeItemsfromCart = (id) => async (dispatch) =>{
    try {
 
        dispatch(cartRequest());

        // const config = {headers:{'Content-Type': 'multipart/form-data'}};

        const {data} = await axios.put(`${BASE_URL}api/v1/cart`,{productId:id})
        console.log(data);
        dispatch(cartdeletesuccess(data))
        
    } catch (error) {
        dispatch(cartdeletefail(error?.response?.data?.message))
    }

}