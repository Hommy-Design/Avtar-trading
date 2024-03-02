import { BASE_URL } from "../../constants/baseurl";
import {cleanErrors,forgotPasswordFail,forgotPasswordRequest,forgotPasswordSuccess,loadUserFail,loadUserRequest,loadUserSuccess,loginFail,loginRequest,loginSuccess,logoutFail,logoutSuccess,registerUserFail,registerUserRequest,registerUserSuccess,resetPasswordFail,resetPasswordRequest,resetPasswordSuccess} from "../slices/userSlice";
import axios from 'axios';

// Login

export const login = (email, password)=> async(dispatch)=>{

    try {
       
        dispatch(loginRequest());

        const config = {headers: {'Content-Type': 'application/json'}}

        const {data} = await axios.post(`${BASE_URL}api/v1/login`, {email, password}, config)
        console.log(data);
        dispatch(loginSuccess(data))
        
    } catch (error) {
        dispatch(loginFail(error?.response?.data?.message))
    }

}

// REGISTER 
export const register = (email, name, password)=> async(dispatch)=>{
    try {

        console.log(email, name, password);
        dispatch(registerUserRequest())
        
        // const config = {headers: {'Content-Type': 'multipart/form-data'}}
        const config = {headers: {'Content-Type': 'application/json'}}
        
        const {data} = await axios.post(`${BASE_URL}api/v1/register`,{email, name, password}, config)
       console.log(data);

        dispatch(registerUserSuccess(data?.user))
        
    } catch (error) {
        dispatch(registerUserFail(error.response.data.message))
        
    }
}

// load user 
export const loadUser = () => async (dispatch) =>{
    try {
        
        dispatch(loadUserRequest())

        const {data} = await axios.get(`${BASE_URL}api/v1/me`)
        

        dispatch(loadUserSuccess(data.user))
        

    } catch (error) {
        dispatch(loadUserFail(error.response.data.message))
 
    }
}




// Clearing Errors 
export const clearError = ()=> async(dispatch)=>{
    dispatch(cleanErrors());
}