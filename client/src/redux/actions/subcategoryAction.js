import {cleanErrors,subcategoryFail,subcategoryRequest,subcategorySuccess,subcategorydeletefail,subcategorydeletesuccess,subcategoryrdeleteReset,subcategoryuploadSuccess} from "../slices/subcategorySlice";
import axios from 'axios';
import {BASE_URL} from '../../constants/baseurl'

// Add Sub-Category 

export const addsubcategory = (categorydata, categoryId)=> async(dispatch)=>{

    try {

        dispatch(subcategoryRequest());

        const config = {headers:{'Content-Type': 'multipart/form-data'}};

        const {data} = await axios.post(`${BASE_URL}api/v1/admin/category/${categoryId}/subcatergory`, categorydata, config)
        console.log(data);
        dispatch(subcategoryuploadSuccess(data))
        
    } catch (error) {
        dispatch(subcategoryFail(error?.response?.data?.message))
    }

}


// Get Sub-Category 

export const getsubcategory = (categoryId)=> async(dispatch)=>{

    try {

        dispatch(subcategoryRequest());

        const {data} = await axios.get(`${BASE_URL}api/v1/admin/category/${categoryId}`)
        // console.log(data?.banners);
        console.log(data);
        dispatch(subcategorySuccess(data?.subcategory))
        
    } catch (error) {
        dispatch(subcategoryFail(error.response.data.message))
    }

}