import {cleanErrors,subsubcategoryFail,subsubcategoryRequest,subsubcategorySuccess,subsubcategorydeletefail,subsubcategorydeletesuccess,subsubcategoryrdeleteReset,subsubcategoryuploadSuccess} from "../slices/subsubcategorySlice";
import axios from 'axios';
import {BASE_URL} from '../../constants/baseurl'
import { identity } from "lodash";

// Add Subsub-Category 

export const addsub_Subcategory = (subsubcatname, subcategoryId)=> async(dispatch)=>{

    try {
console.log(subsubcatname, subcategoryId);
        dispatch(subsubcategoryRequest());

        const config = {headers:{'Content-Type': 'multipart/form-data'}};

        const {data} = await axios.post(`${BASE_URL}api/v1/admin/subcatergory/${subcategoryId}/subsubcatergory`, {"name":subsubcatname}, config)
        console.log(data);
        dispatch(subsubcategoryuploadSuccess(data))
        
    } catch (error) {
        dispatch(subsubcategoryFail(error?.response?.data?.message))
    }

}
// Add Sub-Category 

export const getsub_Subcategory = (id)=> async(dispatch)=>{

    try {
        dispatch(subsubcategoryRequest());

        const config = {headers:{'Content-Type': 'multipart/form-data'}};

        const {data} = await axios.get(`${BASE_URL}api/v1/admin/subcatergory/${id}`)
        console.log(data);
        dispatch(subsubcategorySuccess(data))
        
    } catch (error) {
        dispatch(subsubcategoryFail(error?.response?.data?.message))
    }

}